/** @format */
import { useState } from 'react';
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
import { Button } from "@mui/material";
import Buton from "./components/Transaction/Buton";
import Costs from './components/Transaction/Costs';
// import DashboardPage from "./pages/DashboardPage";
// import { UserContextProvider } from "./storeContext/authContext/UserContextProvider";
import Statistic from "./components/Statistic/Statistic";
import Chart from "./components/Chart/Chart";
import UpdateTransaction from "./components/TransactionTable/UpdateTransaction";

ChartJS.register(
  ArcElement,
  Tooltip,
);


// import { UserContextProvider } from "./storeContext/authContext/UserContextProvider";

ChartJS.register(ArcElement, Tooltip);

function App() {
  const { authenticated } = useContext(UserContext);



  return (
    <div className="App">
      <AppBackground>
        {' '}
        {/* <TransactionForm></TransactionForm> */}
        {/* <ModalAddTransaction /> */}
        {/* <CreateTransaction /> */}
        <Routes>
          <Route
            path="/"
            element={authenticated ? <Navigate to="/" /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/"
            element={
              // <DashboardPage />
              authenticated ? <DashboardPage /> : <Navigate replace to="/login" />
            }
          >
            <Route index element={<Navigate replace to="/table" />} />

            <Route path="table" element={<Table />} />
            <Route path="statistic" element={<Chart />} />
          </Route>
          <Route path="/update-transaction/:transactionId" element={<UpdateTransaction />} />

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
          />
          <Route path="/home" element={<Table />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/donutchart" element={<Donutchart />} /> */}
          {/* <Route path="diagram" element={<Chart />} /> */}

          <Route path="/currency" element={<Currency />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify/:verificationToken" element={<VerifyPage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <span>There's nothing here!</span>
                <br />
                <span>
                  <Link to={'/'}>Return</Link>
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
