const express = require("express");
const {
  getAllPost,
  getSinglePost,
  addPost,
  deletePost,
  updatePost,
} = require("../controllers/post");
const { isUser } = require("../utils/auth/tokenVerification");
const router = express.Router();

/* GET users listing. */
router.get("/", getAllPost);
router.get("/:id", getSinglePost);
router.post("/post", isUser, addPost);
router.delete("/delete/:id", isUser, deletePost);
router.put("/update/:id", isUser, updatePost);

module.exports = router;
