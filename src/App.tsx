import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
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
      <Router>
        <Routes>
          <Route path = "/voting-pywer" element = {<HomeComponent/>}></Route>
          <Route path = "/about" element = {<AboutPage/>}></Route>
        </Routes>
      </Router>
    </div>


  );
}

export default App;
