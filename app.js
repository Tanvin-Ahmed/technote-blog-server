const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const postsRouter = require("./src/routes/posts");
const adminRouter = require("./src/routes/admin");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/post", postsRouter);
app.use("/api/admin", adminRouter);

module.exports = app;
