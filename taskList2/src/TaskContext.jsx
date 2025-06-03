import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('createdAtDesc');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      isImportant: false,
      createdAt: new Date().toLocaleString('uk-UA'),
    };
    console.log('Adding task:', newTask); // Лог для діагностики
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    console.log('Toggling task:', id); // Лог для діагностики
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const task = tasks.find((task) => task.id === id);
    if (!task.completed) {
      console.log('Switching filter to completed'); // Лог для діагностики
      setFilter('completed');
    }
  };

  const toggleImportant = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isImportant: !task.isImportant } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sort === 'titleAsc') return a.title.localeCompare(b.title);
    if (sort === 'titleDesc') return b.title.localeCompare(a.title);
    if (sort === 'createdAtAsc') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === 'createdAtDesc') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === 'importantFirst') return b.isImportant - a.isImportant;
    return 0;
  });

  const filteredTasks = sortedTasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeTasksCount = tasks.filter((task) => !task.completed).length;

  useEffect(() => {
    console.log('Tasks:', tasks);
    console.log('Filtered Tasks:', filteredTasks);
    console.log('Filter:', filter);
  }, [tasks, filter, sort]);

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        toggleTask,
        toggleImportant,
        removeTask,
        editTask,
        setFilter,
        setSort,
        activeTasksCount,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};