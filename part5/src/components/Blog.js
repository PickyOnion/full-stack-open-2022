import blogService from "../services/blogs";
import { useState } from "react";

const Blog = ({ blog }) => {
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

  const handleUpvote = async (id) => {
    const putRequest = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    console.log("id", id);

    blogService.update(id, putRequest);
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
          <button type="submit" onClick={() => handleUpvote(blog.id)}>
            like
          </button>
        </p>
      </div>
    </div>
  );
};

export default Blog;
