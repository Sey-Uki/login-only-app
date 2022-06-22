import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Profile } from "./components/Profile/Profile";

export const AppRoutes = () => {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const logIn = (userName: string, isRemember: boolean) => {
    setIsLoggedIn(true);
    setUserName(userName);

    if (isRemember) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", userName);
    }
  };
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/profile" /> : <LoginForm logIn={logIn} />
        }
      />
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <Profile userName={userName} logOut={logOut} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};
