import { useState } from "react";

const Blog = ({ blog, handleDelete, handleUpvote }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button type="submit" onClick={toggleVisibility}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {`likes ${blog.likes}`}{" "}
          <button type="submit" onClick={() => handleUpvote(blog.id, blog)}>
            like
          </button>
        </p>
        <p>
          <button type="submit" onClick={() => handleDelete(blog)}>
            remove
          </button>
        </p>
      </div>
    </div>
  );
};

export default Blog;
