import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext.jsx';

function TaskForm() {
  const [title, setTitle] = useState('');
  const { addTask, activeTasksCount, setSort } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Додати нове завдання..."
        />
        <button type="submit">Додати</button>
      </form>
      <p>Незавершених завдань: {activeTasksCount}</p>
      <div className="sort-form">
        <label>Сортувати: </label>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="createdAtDesc">Нові спочатку</option>
          <option value="createdAtAsc">Старі спочатку</option>
          <option value="titleAsc">За назвою (А-Я)</option>
          <option value="titleDesc">За назвою (Я-А)</option>
          <option value="importantFirst">Важливі спочатку</option>
        </select>
      </div>
    </div>
  );
}

export default TaskForm;