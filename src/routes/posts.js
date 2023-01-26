const express = require("express");
const {
  getSinglePost,
  addPost,
  deletePost,
  updatePost,
  getAllPostsByStatus,
  getAllPostCount,
  updatePostStatus,
  getAllPostCountByCategory,
} = require("../controllers/post");
const { isUser, isAdmin } = require("../utils/auth/tokenVerification");
const router = express.Router();

/* GET users listing. */
router.get("/", getAllPostsByStatus);
router.get("/single/:id", getSinglePost);
router.get("/get-count/:status", getAllPostCount);
router.get("/get-count-by-category/:category", getAllPostCountByCategory);
router.post("/create", isUser, addPost);
router.delete("/delete/:id", isUser, deletePost);
router.put("/update", isUser, updatePost);
router.put("/approve-blog", isAdmin, updatePostStatus);

module.exports = router;
