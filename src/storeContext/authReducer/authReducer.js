/** @format */
import axios from "axios";

export const types = {
  // AUTH_USER: "authUser",
  LOGIN_USER: "loginUser",
  LOG_OUT: "logOut",
  FETCH_CURRENT_USER: "fetchCurrentUser",
};

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};
export const authReducer = async (state, action) => {
  switch (action.type) {
    case types.LOGIN_USER: {
      const response = await axios.post(
        `http://localhost:5555/api/users/login`,
        action.payload
      );
      localStorage.setItem(
        "my-app-token",
        JSON.stringify(response.data.data.token)
      );

      return state;
    }
    case types.LOG_OUT: {
      return [...state, action.payload];
    }
    default: {
      return state;
    }
  }
};
export const initialUserState = {
  userName: false,
  email: false,
  balance: false,
  authenticated: false,
};
