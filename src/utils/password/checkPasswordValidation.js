const bcrypt = require("bcryptjs");

module.exports.isPasswordCorrect = (hash, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
};
