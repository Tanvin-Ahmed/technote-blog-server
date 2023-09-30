module.exports.config = {
  db_password: process.env.DB_PASSWORD,
  db_database: process.env.DB_DATABASE,
  db_user: process.env.DB_USER,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_url: process.env.DB_URL,

  jwt_secret: process.env.JWT_SECRATE,
};
