import s from "./Header.module.css";

import LogoComponent from "../LogoComponent/LogoComponent";
import UserMenu from "../UserMenu/UserMenu";
import Container from "../Container/Container";

export default function Header() {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerContainer}>
          <LogoComponent />
          <UserMenu />
        </div>
      </Container>
    </header>
  );
}
