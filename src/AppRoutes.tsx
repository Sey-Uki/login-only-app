import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Profile } from "./components/Profile/Profile";

export class AppRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    );
  }
}
