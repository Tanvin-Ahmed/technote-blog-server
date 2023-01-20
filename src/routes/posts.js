const express = require("express");
const {
  getAllPost,
  getSinglePost,
  addPost,
  deletePost,
  updatePost,
} = require("../controllers/post");
const { isUser } = require("../utils/auth/tokenVerification");
const { upload } = require("../utils/imageUpload/imgUpload");
const router = express.Router();

/* GET users listing. */
router.get("/", getAllPost);
router.get("/:id", getSinglePost);
router.post("/create", isUser, upload.single("file"), addPost);
router.delete("/delete/:id", isUser, deletePost);
router.put("/update", isUser, updatePost);

module.exports = router;
