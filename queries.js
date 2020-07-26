const db = require("./sqlite.js");

let query = {};

query.getMovieById = (id) => {
    let sql = "select * from movie where id = ?"
    let params = [id];

    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    })
}

query.getMovieByTitle = (title) => {
  let sql = "select * from movie where title LIKE ?"
  let params = [title];

  return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  })
}

query.getMoviesByYear = (year) => {
  let sql = "select * from movie where year = ?"
  let params = [year];

  return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  })
}

query.getMovieByGenre = (genre) => {
  let sql = "select * from movie where genres LIKE ?"
  let params = [genre];

  return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  })
}

module.exports = query;

// 862, 8844, 15602, 31357, 949, 21032, 10858, 4584, 5, 902, 63, 9598

// {
//   "genres": [
//       "Animation",
//       "Comedy",
//       "Family"
//   ],
//   "id": 862,
//   "imdb_id": "tt0114709",
//   "overview": "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
//   "poster_path": "/rhIRbceoE9lR4veEXuwCC2wARtG.jpg",
//   "release_date": "1995-10-30",
//   "runtime": 81,
//   "tagline": "",
//   "title": "Toy Story",
//   "year": 1995
// }