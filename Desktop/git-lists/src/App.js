import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Search } from './components/Search';
import { Profile } from './components/Profile';
import React from 'react';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {useState, createContext } from "react";
import { LIST_CONSTANTS } from "./utility/constanst"

export const AppContext = createContext();

function App() {
  const [userInput,setUserInput] = useState("");
  return (
    <div>
      <Header title={LIST_CONSTANTS.MSG_HEADER_TITLE} subtitle={LIST_CONSTANTS.MSG_HEADER_SUBTITLE} />
      {/* useContext hook is used here to pass the userInput and setUserInput through the pages. */}
       <AppContext.Provider value={{userInput,setUserInput}}>
        <Router>
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/:id" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/git-lists/:id" element={<Profile />} />
                <Route path="/git-lists/" element={<Profile />} />
            </Routes>
        </Router>
      </AppContext.Provider>
      <Footer note={LIST_CONSTANTS.MSG_FOOTER} />
    </div>
  );
}

export default App;
