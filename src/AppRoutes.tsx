import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Profile } from "./components/Profile/Profile";
import { Endpoints } from "./utils/models";

export const AppRoutes = () => {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();

  const logIn = (userName: string, isRemember: boolean) => {
    setIsLoggedIn(true);
    setUserName(userName);
    navigate(Endpoints.profile);

    if (isRemember) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", userName);
    }
  };
  
  const logOut = () => {
    setIsLoggedIn(false);
    navigate(Endpoints.login);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
  };

  return (
    <Routes>
      <Route
        path={Endpoints.home}
        element={
          isLoggedIn ? (
            <Navigate to={Endpoints.profile} />
          ) : (
            <Navigate to={Endpoints.login} />
          )
        }
      />
      <Route
        path={Endpoints.login}
        element={
          isLoggedIn ? (
            <Navigate to={Endpoints.profile} />
          ) : (
            <LoginForm logIn={logIn} />
          )
        }
      />
      <Route
        path={Endpoints.profile}
        element={
          isLoggedIn ? (
            <Profile userName={userName} logOut={logOut} />
          ) : (
            <Navigate to={Endpoints.login} />
          )
        }
      />
    </Routes>
  );
};
