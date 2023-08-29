/** @format */

import React from 'react';
import s from '../DiagrammTab/DiagramTab.module.css';
import SelectDate from '../Select/Select';
import Category from '../Сategory/Category';

export default function DiagramTab({ fetchDate, data, loader, theme }) {
  const styleSelect = theme.isDarkMode ? s.text : s.dark;
  const styleText = !theme.isDarkMode ? s.textDark : s.textLight;
  const styleCategory = theme.isDarkMode ? s.text : s.darkCategory;

  return (
    <>
      {/* <div className={styleSelect}> */}{' '}
      <SelectDate fetchDate={fetchDate} loader={loader} theme={theme} styleSelect={styleSelect} />
      {/* </div> */}
      <div className={s.container}>
        <p className={s.title}>Category</p> <p className={s.title}>Amount</p>
      </div>
      <div className={styleCategory}>
        {data.total.Expense !== 0 && <Category data={data} theme={theme} />}
      </div>
      <div className={s.containerSum}>
        <p className={s.titleSum}>
          <span className={styleText}>Expenses</span>{' '}
        </p>
        <span className={s.costs}>{data.total.Expense.toFixed(2)}</span>
      </div>
      <div className={s.containerSum}>
        <p className={s.titleSum}>
          <span className={styleText}>Income</span>
        </p>
        <span className={s.income}>{data.total.Income.toFixed(2)}</span>
      </div>
    </>
  );
}
