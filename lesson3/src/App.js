import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Footer from './components/Footer';
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