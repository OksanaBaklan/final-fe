import { Outlet, useLocation } from "react-router-dom";

import s from "./DashboardPage.module.css";
import Navigation from "../../components/Navigation";
// import Currency from "../../components/Currency/Currency";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Balance from "../../components/Balance/Balance";

export default function DashboardPage() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <Header />
      <Container>
        <div className={s.wrapper}>
          <div className={s.flex}>
            <div className={s.navBox}>
              <Navigation />
              <Balance />
            </div>
            {/* <Currency /> */}
          </div>
          <Outlet />
          {/* {pathname === "/table"} */}
        </div>
      </Container>
    </>
  );
}
