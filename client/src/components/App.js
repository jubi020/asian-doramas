import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./views/about/about.js";
import Home from "./home/home.js";
import Login from "./views/login/login.js";
import Register from "./views/registerUser/register.js";
import Auth from '../authenticationCheck/authCheck';
import Dashboard from "./views/userDashboard.js/dashboard.js";
import DramaDetailsPage from './views/dramaDetailsPage/dramaDetailsPage';

function App() {
  return (

      <div className="App">
        <Routes>
          <Route path="/about" element={Auth(About, false)} />
          <Route path="/" element={Auth(Home, null)} />
          <Route path="/login" element={Auth(Login, false)} />
          <Route path="/register" element={Auth(Register, false)} />
          <Route path='/dashboard' element={Auth(Dashboard, false)} />
          <Route path='/drama/:dramaId' element={Auth(DramaDetailsPage, null)} />
        </Routes>
      </div>

  );
}

export default App;
