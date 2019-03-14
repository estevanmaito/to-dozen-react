import React, { useState } from "react";

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

export const App = props => {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = event => {
    setInputText(event.target.value);
  };

  const handleAddToDo = () => {
    if (!inputText) return;

    setItems(items.concat(inputText));
    setInputText("");
  };

  return (
    <div className="App">
      <Input onChange={handleInputChange} text={inputText} />
      <Button onClick={handleAddToDo} />
      <TodoList items={items} />
    </div>
  );
};

export default App;
