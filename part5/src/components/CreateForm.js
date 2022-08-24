import { useState, useEffect, forwardRef } from "react";
import blogService from "../services/blogs";

const CreateForm = forwardRef((props, ref) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlog, setNewBlog] = useState({});

  useEffect(() => {
    blogService.getAll().then((blogs) => props.setBlogs(blogs));
  }, [newBlog, props]);

  const handleNewBlog = async (event) => {
    event.preventDefault();
    window.localStorage.getItem("loggedBlogappUser");
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };
    ref.current.toggleVisibility();
    blogService.create(newBlog);
    setNewBlog(newBlog);
    props.setErrorMessage(
      `a new blog ${newBlogTitle} by ${newBlogAuthor} added`
    );
    setTimeout(() => {
      props.setErrorMessage(null);
    }, 5000);
    setNewBlog("");
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogUrl}
            name="URL"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
});

export default CreateForm;