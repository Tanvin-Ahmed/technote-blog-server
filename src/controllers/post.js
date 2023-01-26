const {
  findSinglePost,
  deleteSinglePost,
  createPost,
  updateSinglePost,
  findAllPostByStatus,
  findAllPostCount,
  approvedSinglePost,
  findAllPostCountByCategory,
} = require("../services/post");

const addPost = async (req, res) => {
  try {
    const info = req.body;

    const data = await createPost(info, req.user.id);
    const newBlog = await findSinglePost(data.insertId);
    return res.status(200).json(newBlog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Blog not uploaded!", error: true });
  }
};

const getAllPostsByStatus = async (req, res) => {
  const category = req.query.cat;
  const status = req.query.status;
  const limit = req.query.limit;
  const offset = req.query.offset;
  try {
    const data = await findAllPostByStatus(status, category, limit, offset);
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(404)
      .json({ message: `No ${status} blogs found!`, error: true });
  }
};

const getAllPostCount = async (req, res) => {
  try {
    const status = req.params.status;
    const count = await findAllPostCount(status);
    return res.status(200).json({ count: count[0]["count(*)"] });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Something went wraing!`, error: true });
  }
};

const getAllPostCountByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const count = await findAllPostCountByCategory(category);
    return res.status(200).json({ count: count[0]["count(*)"] });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Something went wraing!`, error: true });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await findSinglePost(id);
    return res.status(200).json(data[0]);
  } catch (error) {
    return res.status(404).json({ message: "Blog not found!", error: true });
  }
};

const updatePost = async (req, res) => {
  try {
    const info = req.body;
    await updateSinglePost(info, req.user.id);
    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Blog not updated!", error: true });
  }
};

const updatePostStatus = async (req, res) => {
  try {
    const info = req.body;
    await approvedSinglePost(info);
    return res
      .status(200)
      .json({ message: info.id + " number Blog Approved successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!", error: true });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const uid = req.user.id;
    await deleteSinglePost(id, uid);

    return res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Blog not deleted!", error: true });
  }
};

module.exports = {
  addPost,
  getSinglePost,
  updatePost,
  deletePost,
  getAllPostsByStatus,
  getAllPostCount,
  updatePostStatus,
  getAllPostCountByCategory,
};
