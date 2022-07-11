const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

const initialPosts = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let postObject = new Blog(initialPosts[0]);
  await postObject.save();
  postObject = new Blog(initialPosts[1]);
  await postObject.save();
});

test("posts are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blog posts", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
});

test("unique identifier ID is defined", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("blog is saved in the db", async () => {
  const newBlogObject = {
    title: "Check if everything works well",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlogObject)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialPosts.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);
  expect(titles).toContain("Check if everything works well");
});

test("verifies that if the likes property is missing from the request and sets to 0 by default", async () => {
  const newBlogObject = {
    title: "Check if likes are set to 0",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  };

  response = await api.post("/api/blogs").send(newBlogObject);
  expect(response.body.likes).toEqual(0);
});

test("verifies that missing title and url return 400", async () => {
  const newBlogObject = {
    author: "Michael Chan",
  };

  response = await api.post("/api/blogs").send(newBlogObject);
  expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
