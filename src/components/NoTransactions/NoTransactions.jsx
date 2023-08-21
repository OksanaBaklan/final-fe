import s from "./NoTransactions.module.css";

export default function NoTransactions() {
  return <div >
  <h2 className={s.style}>You don't have transactions yet.</h2>
  <br/>
  <h2 className={s.text}>Click on the '+' button below<br/> to add your first transaction</h2>
  </div>;
}
