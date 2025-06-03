import React, { useContext } from 'react';
import { TaskContext } from './TaskContext.jsx';

function TaskFilter() {
  const { setFilter } = useContext(TaskContext);

  return (
    <div className="task-filter">
      <button onClick={() => setFilter('all')}>Всі</button>
      <button onClick={() => setFilter('active')}>Активні</button>
      <button onClick={() => setFilter('completed')}>Завершені</button>
    </div>
  );
}

export default TaskFilter;