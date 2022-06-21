import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Profile } from "./components/Profile/Profile";

export const AppRoutes= () => {

  const [userName, setUserName] = useState('');

    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm setUserName={setUserName} />} />
        <Route path="/profile" element={<Profile userName={userName} />} />
      </Routes>
    );
}
