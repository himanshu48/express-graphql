const express = require("express");

const { graphqlHTTP } = require('express-graphql');
const db = require("./sqlite.js");
const GraphQLSchema = require('./graphqlSchema');

const app = express();
// Server port
const HTTP_PORT = 4000 

app.use(express.json());

// graphql api
app.use(
    '/graphql',
    graphqlHTTP({
      schema: GraphQLSchema,
      graphiql: true,
    }),
  );

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Get a movie by id
app.get("/api/movie/:id", (req, res, next) => {
    var sql = "select * from movie where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port ", HTTP_PORT)
});