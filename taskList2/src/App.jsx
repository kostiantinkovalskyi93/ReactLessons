import React from 'react';
import { TaskProvider } from './TaskContext';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="container">
        <h1 className="app-title">Менеджер завдань</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;