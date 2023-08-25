import s from "./Header.module.css";

import LogoComponent from "../LogoComponent/LogoComponent";
import UserMenu from "../UserMenu/UserMenu";
import Container from "../Container/Container";
import { useSelector } from "react-redux";
import { getToggleTheme } from "../../redux/global/global-selectors";

export default function Header() {
  const theme = useSelector(getToggleTheme)

  return (
    <header className={`${!theme.isDarkMode ? s.headerDark : s.header}`}>
      <Container>
        <div className={s.headerContainer}>
          <LogoComponent />
          <UserMenu />
        </div>
      </Container>
    </header>
  );
}
