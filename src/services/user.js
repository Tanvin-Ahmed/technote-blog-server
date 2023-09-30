const { db } = require("../db/db");
const { v4: uuidV4 } = require("uuid");

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
    "INSERT INTO users (id, email, username, password, img) VALUES (?,?,?,?,?)";
  return new Promise((resolve, reject) => {
    db.query(
      q,
      [uuidV4(), info.email, info.username, info.password, info.img],
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
