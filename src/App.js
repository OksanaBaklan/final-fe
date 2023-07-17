/** @format */

import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBackground from "./components/AppBackground/AppBackground";
import LoginPage from "./pages/LoginPage/LoginPage";
import Currency from "./components/Currency/Currency";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import { UserContext } from "./storeContext/UserContext";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Table from "./components/TransactionTable/Table";
// import DashboardPage from "./pages/DashboardPage";
// import { UserContextProvider } from "./storeContext/authContext/UserContextProvider";

function App() {
  const { authenticated } = useContext(UserContext);

  console.log(authenticated);
  return (
    <div className="App">
      <AppBackground>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route
            path="/"
            element={
              authenticated ? (
                <DashboardPage />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/home" element={<Table />} />

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
