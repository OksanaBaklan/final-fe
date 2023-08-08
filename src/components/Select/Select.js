/** @format */

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { format } from "date-fns";
import { enAU } from "date-fns/locale";

import { selectStyles } from "../Select/selectStyles";
import s from "../Select/select.module.css";

const currentMonth = new Date().getMonth() + 1;

const months = Array.from({ length: 12 }, (_, i) => {
  return format(new Date(0, i), "LLLL", {
    locale: enAU,
  });
});

// const months = [
//   { id: 1, name: 'January' },
//   { id: 2, name: 'February' },
//   { id: 3, name: 'March' },
//   { id: 4, name: 'April' },
//   { id: 5, name: 'May' },
//   { id: 6, name: 'June' },
//   { id: 7, name: 'July' },
//   { id: 8, name: 'August' },
//   { id: 9, name: 'September' },
//   { id: 10, name: 'October' },
//   { id: 11, name: 'November' },
//   { id: 12, name: 'December' },
// ];

const monthOptions = Array(12)
  .fill(null)
  .map((_, index) => ({ value: index + 1, label: months[index] }));

const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear; i >= 2021; i--) {
  years.push({ value: i, label: i.toString() });
}

function SelectDate({ fetchDate, loader }) {
  const [date, setDate] = useState({
    month: currentMonth,
    year: currentYear,
  });

  const token = JSON.parse(localStorage.getItem("my-app-token"));

  async function fetchData(token, date) {
    const response = await fetch(
      `http://localhost:5555/api/statistics?year=${date.year}&month=${date.month}`,
      {
        method: "GET",
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
    <div className={s.selectContainer}>
      <Select
        styles={selectStyles}
        options={monthOptions}
        placeholder="month"
        onChange={(option) => {
          updateDate("month", option.value);
        }}
        isSearchable={false}
        defaultValue={monthOptions.find((month) => month.value === date.month)}
      />
      <Select
        styles={selectStyles}
        options={years}
        placeholder="Год"
        onChange={(option) => {
          updateDate("year", option.value);
        }}
        isSearchable={false}
        defaultValue={years.find((year) => year.value === date.year)}
      />
    </div>
  );
}

export default SelectDate;