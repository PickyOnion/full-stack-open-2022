import { React } from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;

  beforeEach(() => {
    const blog = {
      title: "Hello",
      author: "nico",
      url: "nico.com",
      likes: 31,
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

    container = render(
      <Blog
        blog={blog}
        handleDelete={handleDelete}
        handleUpvote={handleUpvote}
        username={"MrEgger"}
      />
    ).container;
  });

  test("renders title and author", async () => {
    const authorTitle = await screen.getByText("Hello - nico");
    expect(authorTitle).toBeDefined();
  });

  test("url & likes are hidden at start", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("blog's url and number of likes are shown when clicked", async () => {
    const user = userEvent.setup();
    const button = await screen.getByText("view");
    await user.click(button);
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: block");
    const url = await screen.getByText("nico.com");
    expect(url).toBeDefined();
    const likes = await screen.getByText("likes 31");
    expect(likes).toBeDefined();
  });
});
