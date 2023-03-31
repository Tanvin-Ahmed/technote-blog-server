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
  getPostsByUser,
  getUserPostsCount,
  getSearchedPostCount,
  getSearchedCategoryWisePostCount,
} = require("../controllers/post");
const { isUser, isAdmin } = require("../utils/auth/tokenVerification");
const router = express.Router();

/* GET users listing. */
router.get("/", getAllPostsByStatus);
router.get("/single/:id", getSinglePost);
router.get("/get-count/:status", getAllPostCount);
router.get("/get-searched-count", getSearchedPostCount);
router.get(
  "/get-searched-category-wise-blog-count",
  getSearchedCategoryWisePostCount
);
router.get("/get-count-by-category/:category", getAllPostCountByCategory);
router.get("/get-posts-count-by-user", isUser, getUserPostsCount);
router.get("/get-posts-by-user", isUser, getPostsByUser);
router.post("/create", isUser, addPost);
router.delete("/delete/:id", isUser, deletePost);
router.put("/update", isUser, updatePost);
router.put("/approve-blog", isAdmin, updatePostStatus);

module.exports = router;
