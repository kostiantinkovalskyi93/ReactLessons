import React from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';
import data from './data/data.json';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <Main />
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;