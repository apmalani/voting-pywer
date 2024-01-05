import React, { useEffect } from 'react';
import { Router, Route, Routes, BrowserRouter, HashRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import CalculatorComponent from './CalculatorComponent';
import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import AboutPage from './AboutPage';

function App() {
  useEffect (() => {
    document.title = "Voting Pywer";
  }, []);
  
  return (
    <div className="App">
        <Routes>
          <Route path = "/" element = {<HomeComponent/>}></Route>
          <Route path = "/about" element = {<AboutPage/>}></Route>
        </Routes>
    </div>


  );
}

export default App;
