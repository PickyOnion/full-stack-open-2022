const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
