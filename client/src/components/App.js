import React from "react";
// import ReactDOM from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./about/about.js";
import Home from "./home/home.js";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/about" element={<About />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
