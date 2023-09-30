const mysql = require("mysql");
const { config } = require("../config/config");

const db = mysql.createConnection(config.db_url);

db.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    // const removeSchemaSQL = `DROP DATABASE ${config.db_database}`;
    // db.query(removeSchemaSQL, (err, result) => {
    //   if (err) console.log(err);
    //   else console.log(`DROP DATABASE`);
    // });
    const createSchemaSQL = `CREATE SCHEMA IF NOT EXISTS ${config.db_database}`;

    db.query(createSchemaSQL, (err, _) => {
      if (err) {
        console.log(err.message);
      } else {
        db.changeUser({ database: config.db_database }, (err) => {
          if (err) {
            console.log(
              `Error switching to the ${config.db_database} schema: ` +
                err.message
            );
          } else {
            const createAdmin = `CREATE TABLE IF NOT EXISTS admins (
                          id VARCHAR(255) NOT NULL,
                          username VARCHAR(245) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          password VARCHAR(545) NOT NULL,
                          img LONGTEXT NULL DEFAULT NULL,
                          PRIMARY KEY (id))`;
            db.query(createAdmin, (err) => {
              if (err) console.error(err.message);
              else console.log("create admin table successfully");
            });

            const createCategories = `CREATE TABLE IF NOT EXISTS categories (
                            id VARCHAR(255) NOT NULL,
                            category_name VARCHAR(245) NOT NULL,
                            PRIMARY KEY (id)
                            )`;
            db.query(createCategories, (err) => {
              if (err) console.error(err);
              else console.log("create categories table successfully");
            });

            const createUsers = `CREATE TABLE IF NOT EXISTS users (
                        id VARCHAR(255) NOT NULL,
                        username VARCHAR(245) NOT NULL,
                        email VARCHAR(245) NOT NULL,
                        password VARCHAR(245) NOT NULL,
                        img LONGTEXT NULL DEFAULT NULL,
                        PRIMARY KEY (id)
                        )`;
            db.query(createUsers, (err) => {
              if (err) console.error(err.message);
              else console.log("create categories table successfully");
            });

            const createPosts = `CREATE TABLE IF NOT EXISTS posts (
                                id VARCHAR(255) NOT NULL,
                                title VARCHAR(255) NOT NULL,
                                description LONGTEXT NOT NULL,
                                img LONGTEXT NOT NULL,
                                updateAt DATETIME NOT NULL,
                                createAt DATETIME NOT NULL,
                                users_id VARCHAR(255) NOT NULL,
                                categories_id VARCHAR(255) NOT NULL,
                                status VARCHAR(45) NOT NULL,
                                PRIMARY KEY (id),
                                INDEX fk_posts_users1_idx (users_id ASC) VISIBLE,
                                INDEX fk_posts_categories1_idx (categories_id ASC) VISIBLE,
                                CONSTRAINT fk_posts_categories1
                                  FOREIGN KEY (categories_id)
                                  REFERENCES categories (id),
                                CONSTRAINT fk_posts_users1
                                  FOREIGN KEY (users_id)
                                  REFERENCES users (id)
                                  ON DELETE CASCADE
                                  ON UPDATE CASCADE)`;

            db.query(createPosts, (err) => {
              if (err) console.error(err.message);
              else console.log("create posts table successfully");
            });

            const createComments = `CREATE TABLE IF NOT EXISTS comments (
                                    id VARCHAR(255) NOT NULL,
                                    message LONGTEXT NOT NULL,
                                    createdAt DATETIME NOT NULL,
                                    updatedAt DATETIME NOT NULL,
                                    posts_id VARCHAR(255) NOT NULL,
                                    users_id VARCHAR(255) NOT NULL,
                                    PRIMARY KEY (id),
                                    INDEX fk_comments_posts1_idx (posts_id ASC) VISIBLE,
                                    INDEX fk_comments_users1_idx (users_id ASC) VISIBLE,
                                    CONSTRAINT fk_comments_posts1
                                      FOREIGN KEY (posts_id)
                                      REFERENCES posts (id)
                                      ON DELETE CASCADE
                                      ON UPDATE CASCADE,
                                    CONSTRAINT fk_comments_users1
                                      FOREIGN KEY (users_id)
                                      REFERENCES users (id)
                                      ON DELETE CASCADE
                                      ON UPDATE CASCADE)`;

            db.query(createComments, (err) => {
              if (err) console.error(err.message);
              else console.log("create comments table successfully");
            });
          }
          // Close the database connection
          // db.end();
        });
      }
    });
  }
});

module.exports = { db };
