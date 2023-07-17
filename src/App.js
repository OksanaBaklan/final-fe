/** @format */

import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBackground from "./components/AppBackground/AppBackground";
import LoginPage from "./pages/LoginPage/LoginPage";
import Donutchart from "./components/Diagramm Tab/Donutchart";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import TransactionForm from "./components/NewTransaction/TransactionForm";

ChartJS.register(
  ArcElement,
  Tooltip,
);

function App() {

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



  return (
    <div className="App">
      <AppBackground>
        <h1>Money Minder</h1>{" "}
        <TransactionForm></TransactionForm>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/donutchart" element={<Donutchart />} />
        </Routes>
      </AppBackground>
    </div>
  );
}

export default App;
