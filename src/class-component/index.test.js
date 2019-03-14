import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from ".";
import { Input, Button, TodoList } from ".";

Enzyme.configure({ adapter: new Adapter() });
const mount = Enzyme.mount;

describe("<Input />", () => {
  it("should render an input", () => {
    const input = mount(<Input />);
    expect(input.find("input")).toHaveLength(1);
  });

  it("should render the default text", () => {
    const input = mount(<Input text="lorem" />);
    expect(input.find("input[type='text']").prop("value")).toBe("lorem");
  });
});

describe("<Button />", () => {
  it("should render a button", () => {
    const button = mount(<Button />);
    expect(button.find("button")).toHaveLength(1);
  });

  it("should handle click events", () => {
    const clickFn = jest.fn();
    const button = mount(<Button onClick={clickFn} />);
    button.find("button").simulate("click");
    expect(clickFn).toHaveBeenCalled();
  });
});

describe("<ToDoList />", () => {
  it("should render an unordered list", () => {
    const list = mount(<TodoList items={[]} />);
    expect(list.find("ul")).toHaveLength(1);
  });

  it("should render three li", () => {
    const items = ["lorem", "ipsum", "dolor"];
    const list = mount(<TodoList items={items} />);
    expect(list.find("li")).toHaveLength(3);
  });
});

describe("<App />", () => {
  it("should render the app", () => {
    const app = mount(<App />);
    expect(app.find(".App").hasClass("App")).toEqual(true);
  });

  it("should have an Input", () => {
    const app = mount(<App />);
    expect(app.find("Input")).toHaveLength(1);
  });

  it("should have a Button", () => {
    const app = mount(<App />);
    expect(app.find("Button")).toHaveLength(1);
  });

  it("should not add an empty to do", () => {
    const app = mount(<App />);
    app.find("Input").simulate("change", { target: { value: "" } });
    app.find("Button").simulate("click");
    expect(app.find("TodoList li")).toHaveLength(0);
  });

  it("should add a to do", () => {
    const app = mount(<App />);
    app.find("Input").simulate("change", { target: { value: "lorem" } });
    app.find("Button").simulate("click");
    expect(app.find("TodoList li")).toHaveLength(1);
    expect(app.find("TodoList li").text()).toBe("lorem");
  });

  it("should clean the input after adding a to do", () => {
    const app = mount(<App />);
    app.find("Input").simulate("change", { target: { value: "lorem" } });
    app.find("Button").simulate("click");
    expect(app.find("Input").prop("text")).toBe("");
  });
});
