import s from "./Balance.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../../storeContext/UserContext";

export default function Balance() {
  const { balance } = useContext(UserContext);

  console.log(balance);
  useEffect(() => {}, []);
  return (
    <div className={s.balance}>
      <div className={s.label}>Your balance</div>

      <div className={s.amount}>&euro; {balance} </div>
    </div>
  );
}
