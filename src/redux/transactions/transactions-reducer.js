import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  addTransaction,
  getAllTransactions,
  getBalanceTransactions,
  deleteTransaction,
  editTransaction,
  fetchDetailsTransaction,
} from './transaction-operations';

const items = createReducer([], {
  [addTransaction.fulfilled]: (state, { payload }) => [payload, ...state],
  [deleteTransaction.fulfilled]: (state, { payload }) =>
    state.filter(transaction => transaction._id !== payload.deletedId),
  [editTransaction.fulfilled]: (state, { payload }) => {
    console.log(payload);

    const editedTransactionIndex = state.findIndex(
      transaction => transaction._id === payload.transaction._id
    );
    if (editedTransactionIndex !== -1) {
      // Create a new array with the updated transaction
      const updatedItems = state.map((transaction, index) =>
        index === editedTransactionIndex ? payload.transaction : transaction
      );
      // Update the state with the new array
      state.splice(0, state.length, ...updatedItems);
      console.log(updatedItems);
    }
    return state;
  },
  [getAllTransactions.fulfilled]: (_, { payload }) => payload,
});

const detailsTransaction = createReducer(
  {
    _id: null,
    amount: 0,
    date: '',
    isIncome: false,
    category: '',
    comment: '',
  },
  {
    [fetchDetailsTransaction.fulfilled]: (_, { payload }) => payload,
  }
);

const balance = createReducer(0, {
  [getBalanceTransactions.fulfilled]: (_, { payload }) => payload,
  [deleteTransaction.fulfilled]: (_, { payload }) => payload.balance,
  [editTransaction.fulfilled]: (_, { payload }) => payload.balance,
});

const isLoading = createReducer(false, {
  [addTransaction.pending]: () => true,
  [addTransaction.fulfilled]: () => false,
  [addTransaction.rejected]: () => false,

  [editTransaction.pending]: () => true,
  [editTransaction.fulfilled]: () => false,
  [editTransaction.rejected]: () => false,

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
  detailsTransaction,
  isLoading,
});
