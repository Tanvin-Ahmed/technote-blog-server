const {
  findAllPost,
  findSinglePost,
  deleteSinglePost,
  createPost,
  updateSinglePost,
} = require("../services/post");

const addPost = async (req, res) => {
  try {
    const info = req.body;
    const img = req.file.filename;

    const data = await createPost({ ...info, img }, req.user.id);
    const newBlog = await findSinglePost(data.insertId);
    return res.status(200).json(newBlog);
  } catch (error) {
    return res.status(500).json({ message: "Blog not uploaded!", error: true });
  }
};

const getAllPost = async (req, res) => {
  try {
    const category = req.query.cat;
    const data = await findAllPost(category);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "No blogs found!", error: true });
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

module.exports = { addPost, getAllPost, getSinglePost, updatePost, deletePost };
