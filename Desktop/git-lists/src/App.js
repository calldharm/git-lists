import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Search } from './components/Search';
import { Profile } from './components/Profile';
import React from 'react';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {useState, createContext } from "react";

export const AppContext = createContext();

function App() {
  const [userInput,setUserInput] = useState("");
  return (
    <div>
      <Header title="Git Lists" subtitle="" />
      {/* useContext hook is used here to pass the userInput and setUserInput through the pages. */}
       <AppContext.Provider value={{userInput,setUserInput}}>
        <Router>
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/:id" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </Router>
      </AppContext.Provider>
      <Footer note="Simple App to list user repos by Dharm" />
    </div>


    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */

  );
}

export default App;
