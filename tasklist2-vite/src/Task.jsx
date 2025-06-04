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

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <li className="task-item">
      {editTaskId === task.id ? (
        <div className="task-edit-container">
          <input
            type="text"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
            onKeyPress={(e) => handleEditKeyPress(e, task.id)}
            className="edit-input"
          />
          <div className="task-actions">
            <button onClick={() => saveEditTask(task.id)} className="save-button">
              Зберегти
            </button>
            <button onClick={() => deleteTask(task.id)} className="delete-button">
              Видалити
            </button>
          </div>
        </div>
      ) : (
        <div className="task-display-container">
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="task-checkbox"
            />
            <div className="task-details">
              <span className={task.completed ? 'task-text completed' : 'task-text'}>
                {task.text}
              </span>
              <div className="task-dates">
                <span>Створено: {formatDate(task.createdAt)}</span>
                <span>Редаговано: {formatDate(task.editedAt)}</span>
                <div className="task-actions">
                  <button
                    onClick={() => startEditTask(task.id, task.text)}
                    className="edit-button"
                  >
                    Редагувати
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="delete-button">
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default Task;