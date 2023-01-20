const { db } = require("../db/db");

const createPost = async (info, uid) => {
  const q =
    "INSERT INTO posts (`title`, `description`, `img`, `date`, `status`, `admin_id`, `user_id`, `category`) VALUES(?,?,?,?,?,?,?,?)";

  return new Promise((resolve, reject) => {
    db.query(
      q,
      [
        info.title,
        info.description,
        info.img,
        info.date,
        "pending",
        "1",
        uid,
        info.category,
      ],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

const findAllPost = (category = "") => {
  const q = category
    ? "SELECT * FROM posts WHERE category = ?"
    : "SELECT * FROM posts";

  return new Promise((resolve, reject) => {
    db.query(q, [category], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findSinglePost = (id) => {
  const q =
    "SELECT u.username AS authorName, u.id AS authorId, u.img AS authorImg, p.id, `title`, `description`, `date`, `category`, p.img, FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  return new Promise((resolve, reject) => {
    db.query(q, [id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const updateSinglePost = async (info, uid) => {
  const q =
    "UPDTAE INTO posts title=?, description=?, img=?, status=?, category=? WHERE id=? AND uid=?";

  return new Promise((resolve, reject) => {
    db.query(
      q,
      [
        info.title,
        info.description,
        info.img,
        "pending",
        info.category,
        info.id,
        uid,
      ],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

const deleteSinglePost = (id, uid) => {
  const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

  return new Promise((resolve, reject) => {
    db.query(q, [id, uid], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  createPost,
  findAllPost,
  findSinglePost,
  updateSinglePost,
  deleteSinglePost,
};
