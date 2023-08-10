import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Buton from "../../components/Transaction/Buton";
import TransactionForm from "../../components/Transaction/TransactionForm";
import "./DashboardPage.module.css";
import Costs from "../../components/Transaction/Costs";
// import Balance from "components/Balance/Balance";


import s from "./DashboardPage.module.css";
import Navigation from "../../components/Navigation";
// import Currency from "../../components/Currency/Currency";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Balance from "../../components/Balance/Balance";

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
       <Costs />
      <Container >
        <div className={s.wrapper}>
          <div className={s.flex}>
            <div className={s.navBox}>
              <Navigation />
              <Balance/>
            </div>
            {/* <Currency /> */}
          </div>
          <Outlet />
          {pathname === "/home"}

        </div>
      </Container>
       {formIsVisible && <TransactionForm onHideForm={hideFormHandler} />}
      <Buton onShowForm={showFormHandler} />
    </>
  );
}
