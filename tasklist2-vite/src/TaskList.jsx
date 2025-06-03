import React, { useContext } from 'react';
import { TaskContext } from './TaskContext';
import Task from './Task';

function TaskList() {
  const {
    tasks,
    deleteTask,
    startEditTask,
    saveEditTask,
    toggleTaskCompletion,
    editTaskId,
    editTaskText,
    setEditTaskText,
  } = useContext(TaskContext);

  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveEditTask(id);
    }
  };

  return (
    <div className="task-columns">
      <div className="task-column todo-column">
        <h2 className="section-title">To Do</h2>
        <ul className="task-list">
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <Task
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                startEditTask={startEditTask}
                saveEditTask={saveEditTask}
                toggleTaskCompletion={toggleTaskCompletion}
                editTaskId={editTaskId}
                editTaskText={editTaskText}
                setEditTaskText={setEditTaskText}
                handleEditKeyPress={handleEditKeyPress}
              />
            ))}
        </ul>
      </div>
      <div className="task-column completed-column">
        <h2 className="section-title">Виконані</h2>
        <ul className="task-list">
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <Task
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                startEditTask={startEditTask}
                saveEditTask={saveEditTask}
                toggleTaskCompletion={toggleTaskCompletion}
                editTaskId={editTaskId}
                editTaskText={editTaskText}
                setEditTaskText={setEditTaskText}
                handleEditKeyPress={handleEditKeyPress}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;