const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

const indexRouter = require("./src/routes/index");
const authRouter = require("./src/routes/auth");
const postsRouter = require("./src/routes/posts");
const adminRouter = require("./src/routes/admin");

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
app.use("/api/users", authRouter);
app.use("/api/post", postsRouter);
app.use("/api/admin", adminRouter);

module.exports = app;
