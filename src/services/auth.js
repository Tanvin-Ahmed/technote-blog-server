const { db } = require("../db/db");

const getExist = async (email, username) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  return await db.query(q, [email, username]);
};

const createUser = async (info) => {
  const q = "INSERT INTO users (email, username, password) VALUES (?,?,?)";
  return await db.query(q, [info.email, info.username, info.password]);
};

module.exports = { getExist, createUser };
