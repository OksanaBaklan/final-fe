import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  addTransaction,
  getAllTransactions,
  getBalanceTransactions,
} from "./transaction-operations";
const items = createReducer([], {
  [addTransaction.fulfilled]: (state, { payload }) => [payload, ...state],
  [getAllTransactions.fulfilled]: (_, { payload }) => payload,
});
const balance = createReducer(0, {
  [getBalanceTransactions.fulfilled]: (_, { payload }) => payload,
});
const isLoading = createReducer(false, {
  [addTransaction.pending]: () => true,
  [addTransaction.fulfilled]: () => false,
  [addTransaction.rejected]: () => false,
  [getAllTransactions.pending]: () => true,
  [getAllTransactions.fulfilled]: () => false,
  [getAllTransactions.rejected]: () => false,
});
export default combineReducers({
  balance,
  items,
  isLoading,
});
