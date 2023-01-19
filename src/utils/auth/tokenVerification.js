const jwt = require("jsonwebtoken");
const { config } = require("../../config/config");

module.exports.isUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[0];
    const { data } = jwt.verify(token, config.jwt_secret);
    req.user = data;
    return next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Authorization failed!", error: true });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[0];
    const { data } = jwt.verify(token, config.jwt_secret);

    if (data.isAdmin) {
      req.user = data;
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Admin authorization failed!", error: true });
    }
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Admin authorization failed!", error: true });
  }
};
