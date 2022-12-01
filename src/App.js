import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Profile from "./views/Profile";
import BoardUser from "./views/BoardUser";
import BoardModerator from "./views/BoardModerator";
import BoardAdmin from "./views/BoardAdmin";

import { NavBar } from "./views/NavBar";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
