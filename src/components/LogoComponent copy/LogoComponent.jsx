import { useMediaQuery } from "react-responsive";
import s from "./LogoComponent.module.css";
import { ReactComponent as LogoMobile } from "images/logo-form/logoMobile.svg";
import { ReactComponent as Logo } from "images/logo-form/logo.svg";
import { Link } from "react-router-dom";

export default function LogoComponent() {
  const isMobileOrTablet = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <>
      {isMobileOrTablet ? (
        <div className={s.logo}>
          <Link to="/" style={{ textDecoration: "none", color: "unset" }}>
            <Logo /> <span className={s.logo__text}> Wallet</span>
          </Link>
        </div>
      ) : (
        <div className={s.logo}>
          <Link to="/" style={{ textDecoration: "none", color: "unset" }}>
            <LogoMobile />
            <span className={s.logo__text}> Wallet</span>
          </Link>
        </div>
      )}
    </>
  );
}
