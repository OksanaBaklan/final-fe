/** @format */

import { useContext } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBackground from "./components/AppBackground/AppBackground";
import LoginPage from "./pages/LoginPage/LoginPage";
import Donutchart from "./components/Diagramm Tab/Donutchart";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import TransactionForm from "./components/NewTransaction/TransactionForm";
import Currency from "./components/Currency/Currency";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import { UserContext } from "./storeContext/UserContext";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Table from "./components/TransactionTable/Table";
import Statistic from "./components/Statistic/Statistic";
import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction";
// import DashboardPage from "./pages/DashboardPage";
// import { UserContextProvider } from "./storeContext/authContext/UserContextProvider";

ChartJS.register(ArcElement, Tooltip);

function App() {
  const { authenticated } = useContext(UserContext);

  console.log(authenticated);
  return (
    <div className="App">
      <AppBackground>
        {" "}
        <TransactionForm></TransactionForm>
        <ModalAddTransaction />
        <Routes>
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
          <Route
            path="/dashboard"
            element={
              <DashboardPage />
              // authenticated ? (
              //   <DashboardPage />
              // ) : (
              //   <Navigate replace to="/login" />
              // )
            }
          >
            <Route path="table" element={<Table />} />
            <Route path="statistic" element={<Statistic />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/donutchart" element={<Donutchart />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify/:verificationToken" element={<VerifyPage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <span>There's nothing here!</span>
                <br />
                <span>
                  <Link to={"/"}>Return</Link>
                </span>
              </main>
            }
          />
        </Routes>
      </AppBackground>
    </div>
  );
}

export default App;
