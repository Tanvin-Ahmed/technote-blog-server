const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const postsRouter = require("./src/routes/posts");
const categoriesRouter = require("./src/routes/categories");
const commentsRouter = require("./src/routes/comments");

const app = express();

const corsOptions = {
  origin: "https://tech-note.netlify.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/post", postsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/comments", commentsRouter);

module.exports = app;
