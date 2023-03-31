const mysql = require("mysql");
const { config } = require("../config/config");

module.exports.db = mysql.createConnection({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db_database,
});

// if any authentication error is occurred
// in mysql workbench write 2 query serially
// 1st query: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
// 2nd query: flush privileges;
