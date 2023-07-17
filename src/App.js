/** @format */

import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBackground from "./components/AppBackground/AppBackground";
import LoginPage from "./pages/LoginPage/LoginPage";
import Donutchart from "./components/Diagramm Tab/Donutchart";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import TransactionForm from "./components/NewTransaction/TransactionForm";
import Currency from "./components/Currency/Currency";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import HomePage from "./pages/HomePage/HomePage";
import UserProvider, { UserContext } from "./storeContext/UserContext";
// import { UserContextProvider } from "./storeContext/authContext/UserContextProvider";

ChartJS.register(
  ArcElement,
  Tooltip,
);
const INITIAL_DATA = [
  {
    id: '',
    date: new Date(2022, 4, 12),
    categories: 'Vehicle',
    labels: 'salmon',
    amount: 0.99
  },
  {
    id: '',
    date: new Date(2022, 4, 12),
    categories: 'Food&Drinks',
    labels: 'pink',
    amount: 999.99
  },
  {
    id: '',
    date: new Date(2022, 4, 12),
    categories: 'Health Care',
    labels: 'mediumslateblue',
    amount: 9.99
  },
  {
    id: '',
    date: new Date(2022, 4, 12),
    categories: 'Basic Expanses',
    labels: 'skyblue',
    amount: 99.99
  },
  {
    id: '',
    date: new Date(2022, 4, 12),
    categories: 'Child Support',
    labels: 'slateblue',
    amount: 0.99
  },
  {
    id: '',
    date: new Date(2022, 4, 12),
    categories: 'Home, garden',
    labels: 'plum',
    amount: 0.99
  },
  {
    id: '',
    date: new Date(2022, 4, 12),
    categories: 'Education',
    labels: 'mediumaqamarine',
    amount: 9.99
  },
  {
    id: '',
    date: new Date(2022, 4, 12),
    categories: 'Holidays',
    labels: 'yellow',
    amount: 999.99
  },
  {
    id: '',
    date: new Date(2022, 4, 12),
    categories: 'Others Expanses',
    labels: 'mediumseagreen',
    amount: 99.99
  },
]

   


function App() {
  const { authenticated } = useContext(UserContext);

  console.log(authenticated);
  return (
    <div className="App">
      <AppBackground>     <TransactionForm></TransactionForm>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/donutchart" element={<Donutchart />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify/:verificationToken" element={<VerifyPage />} />
        </Routes>
      </AppBackground>
    </div>
  );
}

export default App;
