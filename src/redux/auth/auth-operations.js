import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
// axios.defaults.baseURL = 'http://localhost:5555/api';
axios.defaults.baseURL = process.env.REACT_APP_BE_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('my-app-token', JSON.stringify(token));
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
    localStorage.removeItem('my-app-token');
  },
};

export const authUser = createAsyncThunk(
  'auth/addUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      console.log(data.data);
      if (data) {
        toast.success('Go to your email and confirm registration');
        return data.data;
      }
    } catch (err) {
      console.log(err);
      if (err.response.data === 'Email already registered') {
        return rejectWithValue(toast.error('This user already exists'));
      }
      if (err.response.status === 400) {
        return rejectWithValue(toast.error('Invalid credentials'));
      }
      if (err.response.statusText === 'Internal Server Error') {
        return toast.error('Please try again later');
      }
      return rejectWithValue(toast.error('Please try again later'));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      if (data) {
        token.set(data.token);
        toast.success('You are successfully logged in');
      }
      return data;
    } catch (err) {
      if (err.response.statusText === 'Bad Request') {
        return rejectWithValue(toast.error('E-mail or the password is incorrect'));
      }
      if (err.response.status === 500) {
        return rejectWithValue(toast.error('Confirm your email or try again'));
      }
      return rejectWithValue(err.response.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.get('/users/logout');
    token.unset();
  } catch (error) {
    return rejectWithValue(error.response.message);
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;
    console.log(persistedToken);
    if (!persistedToken) {
      return rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const avatarUpdate = createAsyncThunk(
  'auth/avatarUpdate',
  async (formData, { rejectWithValue }) => {
    try {
      const dataAvatar = await axios.patch(`/users/avatars`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (dataAvatar) {
        toast.success('You are successfully upload new avatar');
      }
      return dataAvatar.data.data.avatar;
    } catch (err) {
      if (err.response.statusText === 'Bad Request') {
        return rejectWithValue(toast.error('image is incorrect'));
      }

      return rejectWithValue(err.response.message);
    }
  }
);
