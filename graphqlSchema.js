const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
} = require('graphql');


const query = require("./queries.js");


const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id:           { type: GraphQLID },
    title:        { type: GraphQLString },
    tagline:      { type: GraphQLString },
    overview:     { type: GraphQLString },
    imdb_id:      { type: GraphQLString },
    poster_path:  { type: GraphQLString },
    release_date: { type: GraphQLString },
    genres:       { type: GraphQLString },
    year:         { type: GraphQLInt },
    runtime:      { type: GraphQLInt },
    moviesYear: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return query.getMoviesByYear(parent.year)
      }
    },
    moviesGenre: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return query.getMovieByGenre(parent.genres.split(',')[0])
      }
    }
  })
});

const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      movie: {
        type: MovieType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve(parent, args) {
            return query.getMovieById(args.id);
        }
    }
    },
  }),
  // mutation: Mutation
});
// mutation is for writing operation
module.exports = rootSchema;