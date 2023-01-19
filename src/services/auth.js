const { db } = require("../db/db");

const getExist = (email) => {
  const q = "SELECT * FROM users WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(q, [email], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const isAdminExist = (email) => {
  const q = "SELECT * FROM admins WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(q, [email], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const createUser = (info) => {
  const q =
    "INSERT INTO users (email, username, password, admins_id) VALUES (?,?,?, ?)";
  return new Promise((resolve, reject) => {
    db.query(
      q,
      [info.email, info.username, info.password, "1"],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

module.exports = { getExist, createUser, isAdminExist };
