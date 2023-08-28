/** @format */

import s from "./LoginPage.module.css";
import { useMediaQuery } from "react-responsive";
import LoginForm from "../../components/LoginForm/LoginForm";

function LoginPage() {
  const isLarge = useMediaQuery({ query: "(min-width: 1280px)" });
  return (
    <>
      {isLarge && <div className={s.content_filter}></div>}
      <div className={s.container}>
        <div className={s.wrapper}>
        </div>
        <div className={s.content_container}>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
