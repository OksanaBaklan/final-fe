import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import { ReactComponent as Logout } from "../../images/icon-logout/logout.svg";
import ModalLogout from "../ModalLogout/ModalLogout";
import s from "./UserMenu.module.css";

export default function UserMenu() {
  const [showModal, setShowModal] = useState(false);
  const isMobileOrTablet = useMediaQuery({ query: "(min-width: 768px)" });

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
        <span className={s.line}>{isMobileOrTablet ? "|" : ""}</span>

        <button onClick={onModalToggle} type="button" className={s.logout}>
          {<Logout />}
          <span className={s.exit}>{isMobileOrTablet ? "Log out" : ""}</span>

        </button>
        {showModal && <ModalLogout onOverlayClose={onOverlayClose} />}
      </>
    </div>
  );
}
