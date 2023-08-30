import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import s from "./DashboardPage.module.css";
import Navigation from "../../components/Navigation";
import Currency from "../../components/Currency/Currency";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Balance from "../../components/Balance/Balance";
import ButtonAddTransaction from "../../components/ButtonAddTransactions/ButtonAddTransactions";

export default function DashboardPage() {
  const location = useLocation();
  const { pathname } = location;
  const isMobileOrTablet = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <>
      <Header />
      <Container>
        <div className={s.wrapper}>
          <div className={s.flex}>
            <div className={s.navBox}>
              <Navigation />

              {/* <Balance /> */}

              {pathname !== "/currency" && <Balance />}

            {isMobileOrTablet && <Currency />}
            </div>
          </div>
          <Outlet />
          {pathname === "/table" && <ButtonAddTransaction />}

        </div>
      </Container>
    </>
  );
}
