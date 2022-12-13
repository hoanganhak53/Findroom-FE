import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Profile from "./views/Profile";
import BoardUser from "./views/BoardUser";
import BoardAdmin from "./views/BoardAdmin";
import NotFound from "./views/NotFound";
import Layout from "./components/Layout";
import { ROLES } from "./constants/roles";
import RequireAuth from "./components/RequireAuth";
import { PostDetail } from "./views/post/PostDetail";
import CreatePost from "./views/CreatePost";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="room" element={<PostDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.user]} navigate="404" />}>
            <Route path="profile" element={<Profile />} />
            <Route path="user" element={<BoardUser />} />
            <Route path="create-post" element={<CreatePost />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} navigate="404" />}>
            <Route path="admin" element={<BoardAdmin />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;