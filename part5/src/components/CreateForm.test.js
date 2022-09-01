import { React } from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateForm from "./CreateForm";

describe("<CreateForm />", () => {
  test("updates parent state and calls onSubmit", async () => {
    const handleAddBlog = jest.fn();
    const user = userEvent.setup();

    render(<CreateForm addBlog={handleAddBlog} />);

    const title = screen.getByPlaceholderText("title");
    const author = screen.getByPlaceholderText("author");
    const url = screen.getByPlaceholderText("url");
    const sendButton = screen.getByText("create");

    await user.type(title, "testtitle");
    await user.type(author, "testauthor");
    await user.type(url, "testurl");
    await user.click(sendButton);

    console.log(handleAddBlog.mock.calls);

    expect(handleAddBlog.mock.calls).toHaveLength(1);
    expect(handleAddBlog.mock.calls[0][0]).toEqual("testtitle");
    expect(handleAddBlog.mock.calls[0][1]).toEqual("testauthor");
    expect(handleAddBlog.mock.calls[0][2]).toEqual("testurl");
  });
});
