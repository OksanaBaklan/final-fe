/** @format */

import s from "./LoginPage.module.css";
import { useMediaQuery } from "react-responsive";
import LoginForm from "../../components/LoginForm";

function LoginPage(props) {
  const { setAuthenticated, setUserName, setUserId, authenticated, setAvatar } =
    props;

  const isLarge = useMediaQuery({ query: "(min-width: 1280px)" });
  return (
    <>
      {isLarge && <div className={s.content_filter}></div>}
      <div className={s.container}>
        <div className={s.wrapper}>
          <h1 className={s.title}>Finance App</h1>
        </div>
        <div className={s.content_container}>
          <LoginForm
            setAuthenticated={setAuthenticated}
            setUserName={setUserName}
            setUserId={setUserId}
            authenticated={authenticated}
            setAvatar={setAvatar}
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
