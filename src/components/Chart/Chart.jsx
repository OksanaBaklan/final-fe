import React, { useContext } from "react";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import s from "./Chart.module.css";
import DiagramTab from "../DiagrammTab/Donutchart";

import { UserContext } from "../../storeContext/UserContext";

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
  const {balance}=useContext(UserContext)

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
      <div className={s.wrapper}>
        <p className={s.mainTitle}>Statistics</p>

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
              <p className={s.total}>&#x20b4; {balance}</p>
              </div>
            </div>
          )}

          <div className={s.containerDiagram}>
            <DiagramTab
              fetchDate={setFetchDate}
              data={fetchDate}
              loader={setLoader}
            />
          </div>
        </div>
      </div>
    </>
  );
}
