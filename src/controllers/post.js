const {
  findSinglePost,
  deleteSinglePost,
  createPost,
  updateSinglePost,
  findAllPostByStatus,
  findAllPostCount,
  approvedSinglePost,
  findAllPostCountByCategory,
  findPostByUser,
  findPostsCountOfUser,
  findSearchedPostCount,
  findSearchedCategoryWisePostCount,
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
  const status = req.query.status;
  const search = req.query.search;
  const category = req.query.cat;
  try {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const data = await findAllPostByStatus(
      status,
      category,
      search,
      limit,
      offset
    );

    if (!data.length) {
      return res.status(404).json({
        message: category
          ? `Searched category blogs not found!`
          : search
          ? `No blogs found like '${search}'`
          : `No ${status} blogs found!`,
        error: true,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({
      message: category
        ? `Searched category blogs not found!`
        : search
        ? `No blogs found like '${search}'`
        : `No ${status} blogs found!`,
      error: true,
    });
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
      .json({ message: `Something went warning!`, error: true });
  }
};

const getSearchedPostCount = async (req, res) => {
  try {
    const { status, search } = req.query;
    const count = await findSearchedPostCount(status, search);
    return res.status(200).json({ count: count[0]["count(*)"] });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Something went warning!`, error: true });
  }
};

const getSearchedCategoryWisePostCount = async (req, res) => {
  try {
    const { status, search } = req.query;
    const count = await findSearchedCategoryWisePostCount(status, search);
    return res.status(200).json({ count: count[0]["count(*)"] });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Something went warning!`, error: true });
  }
};

const getUserPostsCount = async (req, res) => {
  try {
    const id = req.user.id;
    const { status } = req.query;
    const count = await findPostsCountOfUser(id, status);
    return res.status(200).json({ count: count[0]["count(*)"] });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Something went warning!`, error: true });
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

const getPostsByUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { status, limit, offset } = req.query;
    const blogs = await findPostByUser(user_id, status, limit, offset);

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Blogs not found!", error: true });
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
    await deleteSinglePost(id);

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
  getPostsByUser,
  getUserPostsCount,
  getSearchedPostCount,
  getSearchedCategoryWisePostCount,
};
