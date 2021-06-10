import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm.component";
import store from "../../store";
import { Provider } from "react-redux";

describe("Inputs of the form", () =>{

  let component, container;
  let mockHandler = jest.fn();
  beforeEach(()=>{
    component = render(
      <Provider store={store}>
        <BlogForm
          setUser={()=>true}
          setBlogs={()=>true}
          setMessage={()=>true}
          testSubmit={mockHandler}
        />
      </Provider>
    );
    container = component.container;

  });

  test("Value of inputs change when user interaction", () =>{
    const inputTest = "Testing";
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: inputTest}});
    expect(container.querySelector("input")).toHaveValue(inputTest);
  });

  test("Submit form calls the SubmitHandler", () =>{
    fireEvent.submit(container.querySelector("input.btn.login-btn"));
    expect(mockHandler.mock.calls).toHaveLength(1);
  });

});
