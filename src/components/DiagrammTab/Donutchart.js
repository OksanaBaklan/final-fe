/** @format */

import React from "react";
import s from "../DiagrammTab/DiagramTab.module.css";
import SelectDate from "../Select/Select";
import Category from "../Сategory/Category";

export default function DiagramTab({ fetchDate, data, loader }) {
  return (
    <>
      <SelectDate fetchDate={fetchDate} loader={loader} />
      <div className={s.container}>
        <p className={s.title}>Категория</p> <p className={s.title}>Сумма</p>
      </div>

      {data.total.Expense !== 0 && <Category data={data} />}

      <div className={s.containerSum}>
        <p className={s.titleSum}>Расходы</p>
        <span className={s.costs}>{data.total.Expense.toFixed(2)}</span>
      </div>
      <div className={s.containerSum}>
        <p className={s.titleSum}>Доходы</p>
        <span className={s.income}>{data.total.Income.toFixed(2)}</span>
      </div>
    </>
  );
}
