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

  // console.log("blog", blog);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button type="submit" onClick={toggleVisibility}>
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{`likes ${blog.likes}`}</p>
        {/* <p>{user.name}</p> */}
      </div>
    </div>
  );
};

export default Blog;
