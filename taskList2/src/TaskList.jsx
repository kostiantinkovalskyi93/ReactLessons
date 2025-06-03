import React, { useContext, useState } from 'react';
import { TaskContext } from './TaskContext.jsx';

function TaskList() {
  const { tasks, toggleTask, toggleImportant, removeTask, editTask } = useContext(TaskContext);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEdit = (task) => {
    console.log('Opening edit form for task:', task.id); // Лог для діагностики
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  const handleSaveEdit = (id) => {
    if (editTitle.trim()) {
      editTask(id, editTitle);
      setEditingTaskId(null);
      setEditTitle('');
    }
  };

  const handleCheckboxClick = (id) => {
    console.log('Checkbox clicked for task:', id); // Лог для діагностики
    toggleTask(id);
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          {editingTaskId === task.id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(task.id)}>Зберегти</button>
              <button onClick={() => setEditingTaskId(null)}>Скасувати</button>
            </div>
          ) : (
            <div className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxClick(task.id)}
              />
              <span onClick={() => handleEdit(task)}>{task.title}</span>
              <span className="task-time">{task.createdAt}</span>
              <button
                className={task.isImportant ? 'important' : 'not-important'}
                onClick={() => toggleImportant(task.id)}
              >
                {task.isImportant ? '★' : '☆'}
              </button>
              <button onClick={() => removeTask(task.id)}>Видалити</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;