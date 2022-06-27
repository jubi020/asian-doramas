import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./about/about.js";
import Home from "./home/home.js";
import Login from "./login/login.js";
import Register from "./registerUser/register.js";
import Auth from '../authenticationCheck/authCheck';
import Dashboard from "./userDashboard.js/dashboard.js";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/about" element={Auth(About, null)} />
          <Route path="/" element={Auth(Home, null)} />
          <Route path="/login" element={Auth(Login, false)} />
          <Route path="/register" element={Auth(Register, false)} />
          <Route path='/dashboard' element={Auth(Dashboard, false)} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
