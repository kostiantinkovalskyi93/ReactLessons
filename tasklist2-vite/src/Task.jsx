import React from 'react';

function Task({
  task,
  deleteTask,
  startEditTask,
  saveEditTask,
  toggleTaskCompletion,
  editTaskId,
  editTaskText,
  setEditTaskText,
  handleEditKeyPress,
}) {
  return (
    <li className="task-item">
      {editTaskId === task.id ? (
        <input
          type="text"
          value={editTaskText}
          onChange={(e) => setEditTaskText(e.target.value)}
          onKeyPress={(e) => handleEditKeyPress(e, task.id)}
          className="edit-input"
        />
      ) : (
        <div className="task-content">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id)}
            className="task-checkbox"
          />
          <span className={task.completed ? 'task-text completed' : 'task-text'}>
            {task.text}
          </span>
        </div>
      )}
      <div className="task-actions">
        {editTaskId === task.id ? (
          <button onClick={() => saveEditTask(task.id)} className="save-button">
            Зберегти
          </button>
        ) : (
          <button
            onClick={() => startEditTask(task.id, task.text)}
            className="edit-button"
          >
            Редагувати
          </button>
        )}
        <button onClick={() => deleteTask(task.id)} className="delete-button">
          Видалити
        </button>
      </div>
    </li>
  );
}

export default Task;