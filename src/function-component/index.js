import React, { Component } from "react";

export const Input = props => {
  const { onChange, text } = props;
  return <input type="text" value={text} onChange={onChange} />;
};

export const Button = props => {
  const { onClick } = props;
  return <button onClick={onClick}>Add</button>;
};

export const TodoList = props => {
  const { items } = props;
  return (
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      items: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddToDo = this.handleAddToDo.bind(this);
  }

  handleInputChange(event) {
    this.setState({ inputText: event.target.value });
  }

  handleAddToDo() {
    if (!this.state.inputText) return;

    this.setState(state => {
      return {
        items: state.items.concat(state.inputText),
        inputText: ""
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Input onChange={this.handleInputChange} text={this.state.inputText} />
        <Button onClick={this.handleAddToDo} />
        <TodoList items={this.state.items} />
      </div>
    );
  }
}

export default App;
