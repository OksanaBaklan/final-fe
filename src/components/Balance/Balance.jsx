import s from "./Balance.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBalance, getTransactions } from "../../redux/transactions/transactions-selectors";
import { getBalanceTransactions } from "../../redux/transactions/transaction-operations";

export default function Balance() {
  const balance = useSelector(getBalance);
  const transactions = useSelector(getTransactions);
  const dispatch = useDispatch();

  useEffect(() =>{ dispatch(getBalanceTransactions())}, [dispatch, transactions]);

  return (
    <div className={s.balance}>
      <div className={s.label}>Your balance</div>

      <div className={s.amount}>&euro; {balance} </div>
    </div>
  );
}
