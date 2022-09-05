const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id,
  });

  const result = await blog.save();
  result.populate("user", { username: 1, name: 1 });
  user.blogs = user.blogs.concat(result._id); // object instead of ID
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === request.user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response
        .status(401)
        .json({ error: "Cannot delete someone else's blog." });
    }
  }
);

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  response.status(201).json(result);
});

module.exports = blogsRouter;
