/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// axios.defaults.baseURL = 'http://localhost:5555/api';
axios.defaults.baseURL = process.env.REACT_APP_BE_URL;
export const addTransaction = createAsyncThunk(
  'transaction/addTransaction',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/transactions', credentials, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`,
        },
      });
      return data;
    } catch (err) {
      if (err.response.status === 400) {
        return rejectWithValue(toast.error('Incorrect data'));
      }
      if (err.response.status === 401) {
        return rejectWithValue(toast.error('Please re-login and try again later'));
      }
      if (err.response.status === 500) {
        return toast.error('Please try again later');
      }
      return rejectWithValue(toast.error('Please try again later'));
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  'transaction/all',

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/transactions', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`,
        },
      });
      return data.transactions;
    } catch (err) {
      if (err.response.status === 401) {
        return rejectWithValue(toast.error('Please re-login and try again'));
      }
      if (err.response.status === 500) {
        return toast.error('Please try again later');
      }
      return rejectWithValue(toast.error('Please try again later'));
    }
  }
);

export const getBalanceTransactions = createAsyncThunk(
  'transaction/balance',

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/transactions', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`,
        },
      });

      return data.balance;
    } catch (err) {
      return rejectWithValue(
        toast.error('No info about your balance, you are logout, refresh your page')
      );
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/transactions/${_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`,
        },
      });

      return { deletedId: _id, balance: data.data.balance };
    } catch (err) {
      return rejectWithValue(toast.error("Can't delete, you are logout"));
    }
  }
);

export const editTransaction = createAsyncThunk(
  'transactions/edit',
  async ({ _id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/transactions/${_id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`,
        },
      });
      console.log('res from server', data);
      return { editId: _id, balance: data.data.userBalance, transaction: data.data.transaction };
    } catch (err) {
      return rejectWithValue(toast.error("Can't update, you are logout"));
    }
  }
);

export const fetchDetailsTransaction = createAsyncThunk(
  'transaction/detailsTransactions',

  async (_id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/transactions/${_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`,
        },
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        toast.error('No information about your transaction, you are logout, refresh your page')
      );
    }
  }
);
