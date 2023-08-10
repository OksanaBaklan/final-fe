import { Outlet, useLocation } from "react-router-dom";
import s from "./DashboardPage.module.css";
import Navigation from "../../components/Navigation";
// import Currency from "../../components/Currency/Currency";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Balance from "../../components/Balance/Balance";
import ButtonAddTransaction from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import { useState } from "react";
import Buton from "../../components/Transaction/Buton";
import TransactionForm from "../../components/Transaction/TransactionForm";

export default function DashboardPage() {
  const location = useLocation();
  const { pathname } = location;

  const [formIsVisible, setFormIsVisible] = useState(false);

  const showFormHandler = () => {
    setFormIsVisible(true);
  };

  const hideFormHandler = () => {
    setFormIsVisible(false);
  };


  return (
    <>
      <Header />
      <Container >
        <div className={s.wrapper}>
          <div className={s.flex}>
            <div className={s.navBox}>
              <Navigation />
              <Balance />
            </div>
            {/* <Currency /> */}
          </div>
          <Outlet />
          {pathname === "/table" && <ButtonAddTransaction />}

        </div>
      </Container>
       {formIsVisible && <TransactionForm onHideForm={hideFormHandler} />}
      <Buton onShowForm={showFormHandler} />
   
    </>
  );
}
