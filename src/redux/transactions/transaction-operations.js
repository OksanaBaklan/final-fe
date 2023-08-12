/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5555/api";

export const addTransaction = createAsyncThunk(
  "transaction/addTransaction",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/transactions", credentials ,      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("my-app-token"))}`,
        },
      },);
      return data;
    } catch (err) {
      if (err.response.status === 400) {
        return rejectWithValue(toast.error("Incorrect data"));
      }
      if (err.response.status === 401) {
        return rejectWithValue(
          toast.error("Please re-login and try again later")
        );
      }
      if (err.response.status === 500) {
        return toast.error("Please try again later");
      }
      return rejectWithValue(toast.error("Please try again later"));
    }
  }
);
export const getAllTransactions = createAsyncThunk(
  "transaction/all",

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/transactions",        {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("my-app-token"))}`,
        },
      },);
      return data.transactions;
    } catch (err) {
      if (err.response.status === 401) {
        return rejectWithValue(toast.error("Please re-login and try again"));
      }
      if (err.response.status === 500) {
        return toast.error("Please try again later");
      }
      return rejectWithValue(toast.error("Please try again later"));
    }
  }
);
export const getBalanceTransactions = createAsyncThunk(
  "transaction/balance",

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/transactions");

      return data.balance;
    } catch (err) {
      return rejectWithValue(toast.error("No data"));
    }
  }
);
