/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleDelete, handleUpvote, username }) => {
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

  const blogUsername = blog.user.username;

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} - {blog.author}
        <button type="submit" onClick={toggleVisibility}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <p>{blog.url}</p>
        <p>
          {`likes ${blog.likes}`}{" "}
          <button type="submit" onClick={() => handleUpvote(blog.id, blog)}>
            like
          </button>
        </p>
        <p>
          {blogUsername === username && (
            <button type="submit" onClick={() => handleDelete(blog)}>
              remove
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

Blog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleUpvote: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  blog: PropTypes.object,
};

export default Blog;
