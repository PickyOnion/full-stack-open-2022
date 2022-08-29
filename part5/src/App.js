/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import CreateForm from "./components/CreateForm";
import blogService from "./services/blogs";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create({
      title,
      author,
      url,
    });
    setBlogs(blogs.concat(blog));
    setErrorMessage(`a new blog ${title} by ${author} added`);
  };

  const handleUpvote = async (id, blog) => {
    const putRequest = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    const response = await blogService.update(id, putRequest);

    const newBlogs = blogs.map((blog) => (blog.id === id ? response : blog));

    setBlogs(newBlogs);
  };

  const handleDelete = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      await blogService.remove(blogToDelete.id);
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogToDelete.id);
      setBlogs(updatedBlogs);
    }
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  if (user === null) {
    return loginForm();
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <p>
        {`${user.name} logged in`}
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </p>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateForm addBlog={addBlog}></CreateForm>
        </Togglable>
      </div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDelete={handleDelete}
            handleUpvote={handleUpvote}
            username={user.username}
          />
        ))}
    </div>
  );
}; //

export default App;
