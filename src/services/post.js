const { db } = require("../db/db");
const { v4: uuidV4 } = require("uuid");

const createPost = async (info, uid) => {
  const q =
    "INSERT INTO posts (`id`, `title`, `description`, `img`, `createAt`, `status`, `users_id`, `categories_id`, `updateAt`) VALUES(?,?,?,?,?,?,?,?,?)";

  return new Promise((resolve, reject) => {
    db.query(
      q,
      [
        uuidV4(),
        info.title,
        info.description,
        info.img,
        info.createAt,
        "pending",
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

const findAllPostByStatus = (status, category, search, limit, offset) => {
  const q = category
    ? `SELECT *, categories.id AS categoryId, posts.id FROM posts 
    JOIN categories ON posts.categories_id = categories.id 
    WHERE status = ? AND categories_id = ? 
    ORDER BY posts.id DESC
    LIMIT ${limit} 
    OFFSET ${offset}`
    : status === "approved"
    ? `SELECT *, categories.id AS categoryId, posts.id FROM posts 
    JOIN categories ON posts.categories_id = categories.id 
    WHERE status = ? ${search ? `AND title LIKE '%${search}%'` : ``}
    ORDER BY posts.id DESC
    LIMIT ${limit} 
    OFFSET ${offset}`
    : `SELECT users.id AS authorId, users.username AS authorName, users.img AS authorImg, posts.id, posts.img, posts.title, posts.description, posts.status, categories.category_name, categories.id AS categoryId, posts.createAt, posts.updateAt
     FROM posts 
     JOIN users ON users.id = posts.users_id 
     JOIN categories ON categories.id = posts.categories_id
     WHERE status = ? 
     ORDER BY posts.id
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

const findSearchedPostCount = (status, search) => {
  const q = `SELECT count(*) FROM posts WHERE status = ? AND title LIKE '%${search}%'`;

  return new Promise((resolve, reject) => {
    db.query(q, [status], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findSearchedCategoryWisePostCount = (status, search) => {
  const q = `SELECT count(*) FROM posts WHERE status = ? AND categories_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [status, search], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findPostsCountOfUser = (user_id, status) => {
  const q = `SELECT count(*) FROM posts WHERE users_id = ? AND status = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [user_id, status], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findPostByUser = (user_id, status, limit, offset) => {
  const q = `SELECT posts.id, posts.title, posts.img, posts.status, posts.createAt, posts.updateAt, categories.id AS categoryId, categories.category_name FROM posts 
  JOIN categories ON categories.id = posts.categories_id 
  WHERE users_id = ? AND status = ? 
  ORDER BY posts.id DESC
  LIMIT ${limit} 
  OFFSET ${offset}`;

  return new Promise((resolve, reject) => {
    db.query(q, [user_id, status], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findAllPostCountByCategory = (category_id) => {
  const q = `SELECT count(*) FROM posts WHERE categories_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [category_id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findSinglePost = (id) => {
  const q = `
    SELECT users.id AS authorId, users.username AS authorName, users.img AS authorImg, posts.id, posts.img, posts.title, posts.description, posts.status, categories.category_name, categories.id AS categoryId, posts.createAt, posts.updateAt
    FROM posts
    JOIN users ON users.id = posts.users_id
    JOIN categories ON categories.id = posts.categories_id
    WHERE posts.id = ?
    `;

  return new Promise((resolve, reject) => {
    db.query(q, [id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const updateSinglePost = (info, uid) => {
  const q =
    "UPDATE INTO posts title=?, description=?, img=?, status=?, categories_id=?, updateAt=? WHERE id=? AND users_id=?";

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
  const q = `UPDATE posts SET status = ? WHERE id = ? AND users_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(q, [info.status, info.id, info.user_id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const deleteSinglePost = (id) => {
  const q = "DELETE FROM posts WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(q, [id], (err, results) => {
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
  findAllPostCountByCategory,
  findPostByUser,
  findPostsCountOfUser,
  findSearchedPostCount,
  findSearchedCategoryWisePostCount,
};
