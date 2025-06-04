import {useState} from "react";
import "./App.css";
import Header from "./components/header/Header";
import Sweets from "./components/sweets/Sweets";
import Advice from "./components/advice/Advice";
import Footer from "./components/footer/Footer";
function App() {
  return (
    <>
      <Header />
      <main className="page-frame">
        <Sweets />
        <Advice />
      </main>
      <Footer/>
    </>
  );
}

export default App;