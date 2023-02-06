const {
  createComment,
  findAllComments,
  findCommentById,
  deleteComment,
  updateComment,
  findTotalCommentCount,
} = require("../services/comment");

const addComment = async (req, res) => {
  try {
    const info = { ...req.body, user_id: req.user.id };
    const data = await createComment(info);
    const comment = await findCommentById(data.insertId);

    return res.status(200).json(comment[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "comment not uploaded", error: true });
  }
};

const getTotalCommentCount = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const comment_count = await findTotalCommentCount(post_id);

    return res.status(200).json({ count: comment_count[0]["count(*)"] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", error: true });
  }
};

const getAllCommentsByPostId = async (req, res) => {
  try {
    const { post_id, limit, offset } = req.query;
    const comments = await findAllComments(post_id, limit, offset);

    if (!comments.length) {
      return res
        .status(404)
        .json({ message: "No comment post yet!", error: true });
    }

    return res.status(200).json(comments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", error: true });
  }
};

const modifyComment = async (req, res) => {
  try {
    const info = req.body;

    await updateComment(info);
    const comment = await findCommentById(info.id);

    return res.status(200).json(comment[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!", error: true });
  }
};

const removeComment = async (req, res) => {
  try {
    const { id, user_id, admin_id } = req.query;
    await deleteComment(id, user_id, admin_id);

    return res
      .status(200)
      .json({ message: "Comment deleted successfully!", error: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", error: true });
  }
};

module.exports = {
  addComment,
  getAllCommentsByPostId,
  deleteComment,
  removeComment,
  modifyComment,
  getTotalCommentCount,
};
