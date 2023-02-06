const express = require("express");
const {
  addComment,
  getAllCommentsByPostId,
  removeComment,
  modifyComment,
  getTotalCommentCount,
} = require("../controllers/comment");
const { isUser } = require("../utils/auth/tokenVerification");

const router = express.Router();

router.post("/create", isUser, addComment);
router.get("/get", getAllCommentsByPostId);
router.get("/get-count/:post_id", getTotalCommentCount);
router.put("/update", isUser, modifyComment);
router.delete("/delete", isUser, removeComment);

module.exports = router;
