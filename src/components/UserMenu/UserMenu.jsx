import { useState } from "react";
import { ReactComponent as Logout } from "../../images/icon-logout/logout.svg";
import ModalLogout from "../ModalLogout/ModalLogout";
import s from "./UserMenu.module.css";

export default function UserMenu() {
  const [showModal, setShowModal] = useState(false);

  const onModalToggle = () => {
    setShowModal((prev) => !prev);
  };

  const onOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onModalToggle();
    }
  };

  return (
    <div className={s.header__user}>
      <>
        <img
          style={{ borderRadius: "50%" }}
          // src={avatar}
          width="25px"
          height="25px"
          alt="avatar"
        />
        <button onClick={onModalToggle} type="button" className={s.logout}>
          {<Logout />}
        </button>
        {showModal && <ModalLogout onOverlayClose={onOverlayClose} />}
      </>
    </div>
  );
}
