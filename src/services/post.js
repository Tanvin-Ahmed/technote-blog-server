const { db } = require("../db/db");

const createPost = async (info, uid) => {
  const q =
    "INSERT INTO posts (`title`, `description`, `img`, `createAt`, `status`, `admin_id`, `user_id`, `category`, `updateAt`) VALUES(?,?,?,?,?,?,?,?,?)";

  return new Promise((resolve, reject) => {
    db.query(
      q,
      [
        info.title,
        info.description,
        info.img,
        info.createAt,
        "pending",
        "1",
        uid,
        info.category,
        info.updateAt,
      ],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

const findAllPostByStatus = (status, category, limit, offset) => {
  const q = category
    ? `SELECT * FROM posts WHERE status = ? AND category = ? ORDER BY id LIMIT ${limit} OFFSET ${offset}`
    : status === "approved"
    ? `SELECT * FROM posts WHERE status = ? ORDER BY id LIMIT ${limit} OFFSET ${offset}`
    : `SELECT users.id AS authorId, users.username AS authorName, users.img AS authorImg, posts.id, posts.img, posts.title, posts.description, posts.status, posts.category, posts.admin_id, posts.createAt, posts.updateAt
     FROM posts 
     JOIN users 
     ON users.id = posts.user_id 
     WHERE status = ? 
     ORDER BY id 
     LIMIT ${limit} 
     OFFSET ${offset}`;

  return new Promise((resolve, reject) => {
    db.query(q, [status, category], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findAllPostCount = (status) => {
  const q = `SELECT count(*) FROM posts WHERE status = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [status], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findSinglePost = (id) => {
  const q = `
    SELECT users.id AS authorId, users.username AS authorName, users.img AS authorImg, posts.id, posts.img, posts.title, posts.description, posts.status, posts.category, posts.admin_id, posts.createAt, posts.updateAt
    FROM users
    JOIN posts
    ON users.id = posts.user_id
    `;

  return new Promise((resolve, reject) => {
    db.query(q, [id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const updateSinglePost = async (info, uid) => {
  const q =
    "UPDTAE INTO posts title=?, description=?, img=?, status=?, category=?, updateAt=? WHERE id=? AND user_id=?";

  return new Promise((resolve, reject) => {
    db.query(
      q,
      [
        info.title,
        info.description,
        info.img,
        info.status,
        info.category,
        info.updateAt,
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
// admin service
const approvedSinglePost = (info) => {
  const q = `UPDATE posts SET status = ? WHERE id = ? AND user_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [info.status, info.id, info.user_id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const deleteSinglePost = (id, uid) => {
  const q = "DELETE FROM posts WHERE id = ? AND user_id = ?";

  return new Promise((resolve, reject) => {
    db.query(q, [id, uid], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  createPost,
  findSinglePost,
  updateSinglePost,
  deleteSinglePost,
  findAllPostByStatus,
  findAllPostCount,
  approvedSinglePost,
};
