/** @format */

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { format } from 'date-fns';
import { enAU } from 'date-fns/locale';

import { selectStyles } from '../Select/selectStyles';
import s from '../Select/select.module.css';

const currentMonth = new Date().getMonth() + 1;

const months = Array.from({ length: 12 }, (_, i) => {
  return format(new Date(0, i), 'LLLL', {
    locale: enAU,
  });
});

const monthOptions = Array(12)
  .fill(null)
  .map((_, index) => ({ value: index + 1, label: months[index] }));

const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear; i >= 2021; i--) {
  years.push({ value: i, label: i.toString() });
}

function SelectDate({ fetchDate, loader, theme, styleSelect }) {
  const [date, setDate] = useState({
    month: currentMonth,
    year: currentYear,
  });

  const token = JSON.parse(localStorage.getItem('my-app-token'));
  const styleText = !theme.isDarkMode ? s.selectContainerDark : s.selectContainer;

  async function fetchData(token, date) {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/statistics?year=${date.year}&month=${date.month}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.log(error);
    }
    return data;
  }

  const updateDate = async (name, value) => {
    const newDate = { ...date, [name]: value };
    setDate(newDate);
    loader(true);
    const fetch = await fetchData(token, newDate);
    loader(false);
    fetchDate(fetch);
  };
  useEffect(() => {
    updateDate();
  }, []);

  return (
    <div className={styleText}>
      <div className={styleSelect}>
        <Select
          styles={selectStyles}
          options={monthOptions}
          placeholder="month"
          onChange={option => {
            updateDate('month', option.value);
          }}
          isSearchable={false}
          defaultValue={monthOptions.find(month => month.value === date.month)}
        />
      </div>
      <div className={styleSelect}>
        <Select
          styles={selectStyles}
          options={years}
          placeholder="year"
          onChange={option => {
            updateDate('year', option.value);
          }}
          isSearchable={false}
          defaultValue={years.find(year => year.value === date.year)}
        />
      </div>
    </div>
  );
}

export default SelectDate;
