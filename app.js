const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const postsRouter = require("./src/routes/posts");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
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

module.exports = app;
