import { useEffect } from "react";
import Media from "react-media";
import { useSelector, useDispatch } from "react-redux";

import LoaderComponent from "../LoaderComponent/LoaderComponent";

import { getTransactions } from "../../redux/transactions/transactions-selectors";
import { getAllTransactions } from "../../redux/transactions/transaction-operations";
import { getLoading } from "../../redux/transactions/transactions-selectors";

import TransactionTable from "./TransactionTable";
import TransactionTableMobile from "./TransactionTableMobile";

export default function Table() {
  const dispatch = useDispatch()
  const isLoading = useSelector(getLoading)

  useEffect(()=>{
    dispatch(getAllTransactions())
  },[dispatch])

  const transactions = useSelector(getTransactions);
console.log(transactions);
  if (!transactions) {
    return null;
  }
  
  return isLoading ? (
    <LoaderComponent />
  ) : (
    <Media query={{ minWidth: 768 }}>
      {(matches) =>
        matches ? (
          <TransactionTable transactions={transactions} />
        ) : (
          <TransactionTableMobile transactions={transactions} />
        )
      }
    </Media>
  );
}
