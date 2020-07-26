const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

const movieData = require('./moviesList.json');

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                let insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@example.com","admin123456"])
                db.run(insert, ["user","user@example.com","user123456"])
            }
        });
        db.run(`CREATE TABLE movie (
            id INTEGER PRIMARY KEY,
            title text,
            year INTEGER,
            overview text, 
            tagline text, 
            runtime INTEGER,
            release_date text,
            poster_path text,
            genres text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                let insert = 'INSERT INTO movie (id, title, year, overview, tagline, runtime, release_date, poster_path, genres) VALUES (?,?,?,?,?,?,?,?,?)'
               
                movieData.forEach(e => {
                    db.run(insert, [e.id, e.title, e.year, e.overview, e.tagline, e.runtime, e.release_date, e.poster_path, e.genres])
                });
                console.log('movie data written');
            }
        });  
    }
});


module.exports = db;