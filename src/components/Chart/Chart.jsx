import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import s from "./Chart.module.css";
import DiagramTab from "../DiagrammTab/Donutchart";

import { useDispatch, useSelector } from "react-redux";
import { getBalance, getTransactions } from "../../redux/transactions/transactions-selectors";
import { useEffect } from "react";
import { getBalanceTransactions } from "../../redux/transactions/transaction-operations";
import { getToggleTheme } from "../../redux/global/global-selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

const obj = {
  category: [
    {
      id: "",
      name: "",
      color: "",
      total: 0,
    },
  ],
  total: {
    Expense: 0,
    Income: 0,
  },
};

export default function Chart() {
  const theme = useSelector(getToggleTheme)

  const styleText = !theme.isDarkMode ? s.textDark : s.textLight
  const styleTitle = !theme.isDarkMode ? s.mainTitleDark : s.mainTitle

  // const isAuth = useSelector(getAuth);
  const balance = useSelector(getBalance);
  const transactions = useSelector(getTransactions);
  const dispatch = useDispatch();

  useEffect(() =>{ dispatch(getBalanceTransactions())}, [dispatch, transactions]);


  const [loader, setLoader] = useState(false);
  const [fetchDate, setFetchDate] = useState(obj);
  const arrName = [];
  const arrTotal = [];
  const arrColor = [];

  fetchDate?.category.forEach((item) => {
    arrName.push(item.name);
    arrTotal.push(item.total);
    arrColor.push(item.color);
  });

  const data = {
    labels: [...arrName],

    datasets: [
      {
        data: [...arrTotal],
        backgroundColor: [...arrColor],
        borderWidth: 0,
        cutout: 100,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <>
     {fetchDate? <div className={s.wrapper}>
        <p className={styleTitle}>Statistics</p>

        <div className={s.rightContainer}>
          {fetchDate.total.Expense === 0 && !loader && (
            <p className={s.text}>There are no transaction for the selected period</p>
          )}

          {loader && (
            <>
              <div className={s.chart}> </div>
              <div className={s.loader}>
                {/* < /> */}
              </div>
            </>
          )}

          {fetchDate.total.Expense !== 0 && !loader && (
            <div className={s.chart}>
              <Doughnut data={data} options={options} />
              <div className={s.containerTotal}>
              <p className={s.total}> <span className={styleText}>&euro; {balance}</span> </p>
              </div>
            </div>
          )}

          <div className={s.containerDiagram}>
            <DiagramTab
              fetchDate={setFetchDate}
              data={fetchDate}
              loader={setLoader}
              theme={theme}
            />
          </div>
        </div>
      </div>:
      <h2 style={{color: "red", textAlign: "center", margin:"2em auto"}}>something went wrong <br/> refresh your page</h2>}
    </>
  );
}
