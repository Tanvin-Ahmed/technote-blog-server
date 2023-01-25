const express = require("express");
const {
  getSinglePost,
  addPost,
  deletePost,
  updatePost,
  getAllPostsByStatus,
  getAllPostCount,
  updatePostStatus,
} = require("../controllers/post");
const { isUser, isAdmin } = require("../utils/auth/tokenVerification");
const router = express.Router();

/* GET users listing. */
router.get("/", getAllPostsByStatus);
router.get("/single/:id", getSinglePost);
router.get("/get-count/:status", getAllPostCount);
router.post("/create", isUser, addPost);
router.delete("/delete/:id", isUser, deletePost);
router.put("/update", isUser, updatePost);
router.put("/approve-blog", isAdmin, updatePostStatus);

module.exports = router;
