/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import PropTypes from "prop-types";

const CreateForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleNewBlog = (event) => {
    event.preventDefault();
    addBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleFieldChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleFieldChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleFieldChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

CreateForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default CreateForm;
