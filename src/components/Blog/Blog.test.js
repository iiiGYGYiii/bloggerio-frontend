import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, getByText } from "@testing-library/react";
import Blog from "./Blog.component";

let component, container;
  const blog = {
    author: "Tester",
    title: "Testing",
    url: "test.this.es",
    user: "disTester",
    likes: 0,
    ID: "abc123def456",
    setBlogs: ()=>true
  }

  const mockHandler = jest.fn();

  beforeEach(() => {
    
    component = render(
      <Blog {...blog} likesTest={mockHandler} />
    );
    container = component.container;
  });

describe("Component is rendered", () =>{
  test("Component display Author and Title, no more info.", () =>{
    expect(container.querySelector(".blog-card")).toBeDefined();
    expect(container).toHaveTextContent(blog.title);
    expect(container).toHaveTextContent(blog.author);
    expect(container).not.toHaveTextContent("Url: ");
    expect(container).not.toHaveTextContent("Posted by: ");
    expect(container).not.toHaveTextContent("Likes: ");
  });
});

describe("Buttons are functional", () =>{
  test("After clicking 'More Info' button, Url, User and Likes are shown", () =>{

    const button = container.querySelector(".show-info-btn");
    fireEvent.click(button);

    expect(container.querySelector(".blog-card")).toBeDefined();
    expect(container).toHaveTextContent(blog.title);
    expect(container).toHaveTextContent(blog.author);
    expect(container).toHaveTextContent("Url: ");
    expect(container).toHaveTextContent("Posted by: ");
    expect(container).toHaveTextContent("Likes: ");
    expect(container).not.toHaveTextContent("More Info");
    expect(container).toHaveTextContent("Hide");
  });

  test("Functionality of Like Button", () =>{
    fireEvent.click(container.querySelector(".show-info-btn"));
    const button = container.querySelector(".like-btn");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);

  });

});
