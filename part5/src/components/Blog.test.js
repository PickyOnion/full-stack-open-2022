import { React } from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author, doesn't render url & likes", () => {
  const blog = {
    title: "Hello",
    author: "nico",
    url: "asdas",
    likes: 0,
    user: {
      username: "MrEgger",
      name: "Eggy Egg",
      id: "62d9c414e8cfbdc28814763a",
    },
    id: "62f68fba6f044724f348d846",
  };

  const handleDelete = () => {
    console.log("first");
  };

  const handleUpvote = () => {
    console.log("Second");
  };

  const { container } = render(
    <Blog
      blog={blog}
      handleDelete={handleDelete}
      handleUpvote={handleUpvote}
      username={"MrEgger"}
    />
  );

  const authorTitle = screen.getByText("Hello - nico");
  expect(authorTitle).toBeDefined();

  const div = container.querySelector(".togglableContent");
  expect(div).toHaveStyle("display: none");
});
