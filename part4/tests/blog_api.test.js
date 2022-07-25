const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
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

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  let postObject = new Blog(initialPosts[0]);
  await postObject.save();
  postObject = new Blog(initialPosts[1]);
  await postObject.save();
  await User.deleteMany({});

  await api.post("/api/users").send(helper.initialUser);

  const response = await api.post("/api/login").send({
    username: helper.initialUser.username,
    password: helper.initialUser.password,
  });
  token = response.body.token;
  console.log("response.body.token", response.body.token);
});

test("posts are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("authorization", `bearer ${token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blog posts", async () => {
  const response = await api
    .get("/api/blogs")
    .set("authorization", `bearer ${token}`);
  expect(response.body).toHaveLength(2);
});

test("unique identifier ID is defined", async () => {
  const response = await api
    .get("/api/blogs")
    .set("authorization", `bearer ${token}`);
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
    .set("authorization", `bearer ${token}`)
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

  response = await api
    .post("/api/blogs")
    .send(newBlogObject)
    .set("authorization", `bearer ${token}`);
  expect(response.body.likes).toEqual(0);
});

test("verifies that missing title and url return 400", async () => {
  const newBlogObject = {
    author: "Michael Chan",
  };

  response = await api
    .post("/api/blogs")
    .send(newBlogObject)
    .set("authorization", `bearer ${token}`);
  expect(400);
});

describe("deletion of a blog post", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialPosts.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });

  test("fails with 400 if id is invalid", async () => {
    await api
      .delete("/api/blogs/sadhjfaldskubf")
      .set("authorization", `bearer ${token}`)
      .expect(400);
  });
});

describe("update of a blog post", () => {
  test("succeeds with status code 201 if blog is updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    updatedBody = {
      title: "React patterns - updated",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBody)
      .set("authorization", `bearer ${token}`)
      .expect(201);
  });

  test("response has been updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    updatedBody = {
      title: "React patterns - updated",
      author: "Michael Chan - updated",
      url: "https://reactpatterns.com/updated",
      likes: 8,
    };

    console.log(blogToUpdate.id);

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBody)
      .set("authorization", `bearer ${token}`);

    console.log(response.body);

    expect(response.body.title).toBe("React patterns - updated");
    expect(response.body.author).toContain("Michael Chan - updated");
    expect(response.body.url).toContain("https://reactpatterns.com/updated");
    expect(response.body.likes).toEqual(8);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
