const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const user = require("../models/user");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const defaultUser = await User.findById("62d875a6b1e613557d95afcc");
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: defaultUser.id,
  });

  const result = await blog.save();
  defaultUser.blogs = defaultUser.blogs.concat(result._id); // object instead of ID
  await defaultUser.save();
  response.status(201).json({
    blog: result,
    username: defaultUser.username,
  });
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  response.status(201).json(result);
});

module.exports = blogsRouter;
