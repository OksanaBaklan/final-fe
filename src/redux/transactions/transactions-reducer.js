import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  addTransaction,
  getAllTransactions,
  getBalanceTransactions,
  deleteTransaction,
  editTransaction,
  getDetailsTransactions
} from "./transaction-operations";

const items = createReducer([], {
  [addTransaction.fulfilled]: (state, { payload }) => [payload, ...state],
  [deleteTransaction.fulfilled]: (state, { payload }) => state.filter(transaction => transaction._id !== payload.deletedId),
  [getAllTransactions.fulfilled]: (_, { payload }) => payload,
});

const item = createReducer({
  _id: null,
  amount: 0,
  date: '',
  isIncome: false,
  category: '',
  comment: '',
}, {
  [editTransaction.fulfilled]: (_, { payload }) => payload,
  [editTransaction.rejected]: (state, { payload }) => state,

  [getDetailsTransactions.fulfilled]: (_, {payload})=>payload,
})

const balance = createReducer(0, {
  [getBalanceTransactions.fulfilled]: (_, { payload }) => payload,
  [deleteTransaction.fulfilled]: (_, { payload }) => payload.balance,
});

const isLoading = createReducer(false, {
  [addTransaction.pending]: () => true,
  [addTransaction.fulfilled]: () => false,
  [addTransaction.rejected]: () => false,
  
  [deleteTransaction.pending]: () => true,
  [deleteTransaction.fulfilled]: () => false,
  [deleteTransaction.rejected]: () => false,

  [getAllTransactions.pending]: () => true,
  [getAllTransactions.fulfilled]: () => false,
  [getAllTransactions.rejected]: () => false,
});
export default combineReducers({
  balance,
  items,
  item,
  isLoading,
});
