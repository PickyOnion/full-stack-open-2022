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

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} - {blog.author}
        <button type="submit" onClick={toggleVisibility} id="button-view">
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <p>{blog.url}</p>
        <p>
          {`likes ${blog.likes}`}{" "}
          <button
            type="submit"
            id="button-like"
            onClick={() => handleUpvote(blog.id, blog)}
          >
            like
          </button>
        </p>
        <p>
          {blog.user.username === username && (
            <button
              type="submit"
              id="button-delete"
              onClick={() => handleDelete(blog)}
            >
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
