const { db } = require("../db/db");

const createComment = (info) => {
  const q = `INSERT INTO comments (message, posts_id, users_id, createdAt, updatedAt) VALUES (?,?,?,?,?)`;
  return new Promise((resolve, reject) => {
    db.query(
      q,
      [
        info.message,
        info.post_id,
        info.user_id,
        info.createdAt,
        info.createdAt,
      ],
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });
};

const findTotalCommentCount = (post_id) => {
  const q = `SELECT count(*) FROM comments WHERE posts_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [post_id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findCommentById = (id) => {
  const q = `SELECT comments.id, comments.message, comments.createdAt, comments.updatedAt, comments.posts_id, users.id AS authorId, users.username AS authorName, users.img AS authorImg
    FROM comments 
    JOIN users ON comments.users_id = users.id 
    WHERE comments.id=?`;

  return new Promise((resolve, reject) => {
    db.query(q, [id], (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

const findAllComments = (post_id, limit, offset) => {
  const q = `SELECT comments.id, comments.message, comments.createdAt, comments.updatedAt, comments.posts_id, users.id AS authorId, users.username AS authorName, users.img AS authorImg
    FROM comments 
    JOIN users ON comments.users_id = users.id 
    WHERE posts_id=? 
    ORDER BY comments.id DESC
    LIMIT ${limit} 
    OFFSET ${offset}`;

  return new Promise((resolve, reject) => {
    db.query(q, [post_id], (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

const updateComment = (info) => {
  const q = `UPDATE comments SET message = ?, updatedAt = ? WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [info.message, info.updatedAt, info.id], (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

const deleteComment = (id, user_id) => {
  const q = `DELETE FROM comments WHERE id = ? AND users_id = ?`;
  return new Promise((resolve, reject) => {
    db.query(q, [id, user_id], (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  findAllComments,
  findCommentById,
  findTotalCommentCount,
};
