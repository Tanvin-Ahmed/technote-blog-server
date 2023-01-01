const express = require("express");
const { register, login, logout } = require("../controllers/auth");
const router = express.Router();

/* GET users listing. */
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
