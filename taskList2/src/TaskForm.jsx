import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext';

function TaskForm() {
  const { addTask } = useContext(TaskContext);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="task-input"
        placeholder="Введіть нове завдання"
      />
      <button type="submit" className="add-button">
        Додати завдання
      </button>
    </form>
  );
}

export default TaskForm;