import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./components/views/about/about.js";
import Home from "./components/home/home.js";
import Login from "./components/views/login/login.js";
import Register from "./components/views/registerUser/register.js";
import Auth from './authenticationCheck/authCheck';
import DramaDetailsPage from './components/views/dramaDetailsPage/dramaDetailsPage';
import FavDramaPage from "./components/views/favDramaPage/favDramaPage.js";

function App() {
  return (

      <div className="App">
        <Routes>
          <Route path="/about" element={Auth(About, null)} />
          <Route path="/" element={Auth(Home, null)} />
          <Route path="/login" element={Auth(Login, false)} />
          <Route path="/register" element={Auth(Register, false)} />
          <Route path='/drama/:dramaId' element={Auth(DramaDetailsPage, null)} />
          <Route path='/favourite' element={Auth(FavDramaPage, false)} />
        </Routes>
      </div>

  );
}

export default App;
