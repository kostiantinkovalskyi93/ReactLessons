import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
        },
      ]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditTask = (id, text) => {
    setEditTaskId(id);
    setEditTaskText(text);
  };

  const saveEditTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editTaskText } : task
      )
    );
    setEditTaskId(null);
    setEditTaskText('');
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        startEditTask,
        saveEditTask,
        toggleTaskCompletion,
        editTaskId,
        editTaskText,
        setEditTaskText,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};