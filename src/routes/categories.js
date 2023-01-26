const express = require("express");
const { isAdmin } = require("../utils/auth/tokenVerification");
const {
  getAllCategory,
  addNewCategory,
  updateCat,
  deleteCat,
  getAllCategoryBySearch,
  getCategoryCount,
} = require("../controllers/categories");

const router = express.Router();

router.get("/", getAllCategory);
router.get("/total-count", getCategoryCount);
router.get("/search/:search", getAllCategoryBySearch);
router.post("/create", isAdmin, addNewCategory);
router.put("/update", isAdmin, updateCat);
router.delete("/delete/:id", isAdmin, deleteCat);

module.exports = router;
