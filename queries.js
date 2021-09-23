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
  let params = [`%${genre}%`];

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