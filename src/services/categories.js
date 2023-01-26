const { db } = require("../db/db");

const createNewCategory = (category) => {
  const q = `INSERT INTO categories (category_name, admins_id) VALUES(?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(q, [category, "1"], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const findSingleCategory = (id) => {
  const q = `SELECT * FROM categories WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const findCategories = (limit, offset) => {
  const q = `SELECT * FROM categories LIMIT ${limit} OFFSET ${offset}`;

  return new Promise((resolve, reject) => {
    db.query(q, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const findCategoryCount = () => {
  const q = `SELECT count(*) FROM categories`;

  return new Promise((resolve, reject) => {
    db.query(q, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const findCategoriesBySearch = (search) => {
  const q = `SELECT * FROM categories WHERE category_name LIKE '%${search}%'`;

  return new Promise((resolve, reject) => {
    db.query(q, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const updateCategory = (id, category) => {
  const q = `UPDATE categories SET category_name = ? WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [category, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const deleteCategory = (id) => {
  const q = `DELETE FROM categories WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = {
  createNewCategory,
  findCategories,
  deleteCategory,
  findSingleCategory,
  updateCategory,
  findCategoriesBySearch,
  findCategoryCount,
};
