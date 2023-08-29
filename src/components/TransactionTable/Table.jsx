import { useEffect } from "react";
import Media from "react-media";
import { useSelector, useDispatch } from "react-redux";

import LoaderComponent from "../LoaderComponent/LoaderComponent";

import { getTransactions } from "../../redux/transactions/transactions-selectors";
import { getAllTransactions, deleteTransaction } from "../../redux/transactions/transaction-operations";
import { getLoading } from "../../redux/transactions/transactions-selectors";

import TransactionTable from "./TransactionTable";
import TransactionTableMobile from "./TransactionTableMobile";
import NoTransactions from "../NoTransactions";
import s from "./TransactionTable.module.css";

export default function Table() {
  const dispatch = useDispatch()
  const isLoading = useSelector(getLoading)
  useEffect(() => {
    dispatch(getAllTransactions())
  }, [dispatch])

  const transactions = useSelector(getTransactions);
  const transactionType = typeof transactions;
  const text = "something went wrong, please refresh your page"
  if (transactionType !== 'object') {
    return (<div className={s.tableWrapper}>
      <NoTransactions text={text} />
    </div>)
  }

  const transactionsDeleteHandler = id => {
    dispatch(deleteTransaction(id));
  };

  return isLoading ? (
    <LoaderComponent />
  ) : (
    <Media query={{ minWidth: 768 }}>
      {(matches) =>
        matches ? (
          <TransactionTable transactions={transactions} transactionsDeleteHandler={transactionsDeleteHandler} />
        ) : (
          <TransactionTableMobile transactions={transactions} />
        )
      }
    </Media>
  );
}
