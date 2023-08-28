import s from "./NoTransactions.module.css";

export default function NoTransactions({text}) {
  return(
    <>{
      text?
      <h3 style={{color: "red", textAlign: "center", margin:"2em auto"}}>{text}</h3>
      :
      <div>
      <h2 className={s.style}>You don't have transactions yet.</h2>
      <br/>
      <h2 className={s.text}>Click on the '+' button below<br/> to add your first transaction</h2>
      </div>
    }

    </>
  )
}
