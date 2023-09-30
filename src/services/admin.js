const { db } = require("../db/db");

const createAdmin = (data) => {
  const { username, email, password, img } = data;

  const q = `INSERT INTO admins (username, email, password, img) VALUES(?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.query(q, [username, email, password, img], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = { createAdmin };
