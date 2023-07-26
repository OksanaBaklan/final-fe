/** @format */

import { useReducer } from "react";
import { TransactionsContext } from "./TransactionsContext";
import {
  transactionsReducer,
  initialState,
} from "../reducers/TransactionsReducer";

export function TransactionsContextProvider({ children }) {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);

  return (
    <TransactionsContext.Provider value={{ transactions: state, dispatch }}>
      {children}
    </TransactionsContext.Provider>
  );
}
