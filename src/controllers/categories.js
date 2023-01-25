const {
  createNewCategory,
  deleteCategory,
  findCategories,
  findSingleCategory,
  updateCategory,
  findCategoriesBySearch,
} = require("../services/categories");

const addNewCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const data = await createNewCategory(category);
    const newCategory = await findSingleCategory(data.insertId);

    return res.status(200).json(newCategory[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!", error: true });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await findCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something went wrong!", error: true });
  }
};

const getAllCategoryBySearch = async (req, res) => {
  try {
    const search = req.params.search;
    const categories = await findCategoriesBySearch(search);
    console.log(categories);
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something went wrong!", error: true });
  }
};

const updateCat = async (req, res) => {
  try {
    const info = req.body;
    await updateCategory(info.id, info.category_name);
    const category = await findSingleCategory(info.id);

    return res.status(200).json(category[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Category not update!", error: true });
  }
};

const deleteCat = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteCategory(id);

    return res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Category not deleted!", error: true });
  }
};

module.exports = {
  deleteCat,
  addNewCategory,
  updateCat,
  getAllCategory,
  getAllCategoryBySearch,
};
