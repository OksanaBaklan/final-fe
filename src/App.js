/** @format */

import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBackground from "./components/AppBackground/AppBackground";
import LoginPage from "./pages/LoginPage/LoginPage";
import Currency from "./components/Currency/Currency";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import HomePage from "./pages/HomePage/HomePage";
import UserProvider, { UserContext } from "./storeContext/UserContext";
// import { UserContextProvider } from "./storeContext/authContext/UserContextProvider";

function App() {
  const { authenticated } = useContext(UserContext);

  console.log(authenticated);
  return (
    <div className="App">
      <AppBackground>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify/:verificationToken" element={<VerifyPage />} />
        </Routes>
      </AppBackground>
    </div>
  );
}

export default App;
