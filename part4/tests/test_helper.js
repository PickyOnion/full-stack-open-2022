const Blog = require("../models/blog");
const User = require("../models/user");

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const initialUser = {
  username: "MichaelJackson",
  name: "Michael Jackson",
  password: "billiejeans",
};

const invalidUsers = [
  {
    username: "MichaelJackson",
    name: "Michael Jackson",
    password: "smoothcriminal",
  },
  {
    username: "Mi",
    name: "Michael Jackson",
    password: "smoothcriminal",
  },
  {
    username: "JichaelMackson",
    name: "Michael Jackson",
    password: "uh",
  },
];

module.exports = { initialUser, invalidUsers, blogsInDb, usersInDb };
