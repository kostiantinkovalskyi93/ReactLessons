import React from 'react';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import TaskFilter from './TaskFilter.jsx';
import { TaskProvider } from './TaskContext.jsx';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <h1>Список завдань</h1>
        <TaskForm />
        <TaskFilter />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;