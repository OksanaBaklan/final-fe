import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialUserState = {
  data: { userName: null, email: null, balance: null },
  token: null,
};

const user = createReducer(initialUserState, {

  
});

const token = createReducer(null, {

  
});

const isAuth = createReducer(false, {

  
});


export default combineReducers({
  user,
  token,
  isAuth,
});
