import { ReactComponent as Logout } from "../../images/icon-logout/logout.svg";
import s from "./UserMenu.module.css";

export default function UserMenu() {

  return (
    <div className={s.header__user}>
      <>
        <img
          style={{ borderRadius: "50%" }}
          // src={avatar}
          width='25px'
          height='25px'
          alt='avatar'
        />
        <Logout/>
      </>


    </div>
  );
}
