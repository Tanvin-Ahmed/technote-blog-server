const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/blogImgs");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

module.exports.upload = multer({ storage: storage });
