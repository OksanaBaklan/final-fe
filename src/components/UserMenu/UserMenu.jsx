import { Fragment, useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as Logout } from "../../images/icon-logout/logout.svg";
import { getUsername, getUserAvatar } from "../../redux/auth/auth-selectors";
import { logOut } from "../../redux/auth/auth-operations";
import s from "./UserMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import AvatarUpdateForm from "./AvatarUpdateForm";
import { globalAction, globalSelectors } from "../../redux/global";
import {LogoutModalPortal} from "../ModalLogout/modalLogOutPortal";
import DarkMode from "../DarkMode/DarkMode";

export default function UserMenu({isDarkMode, }) {
  const [updatedNewAvatar, setUpdatedNewAvatar] = useState('')

  const isMobileOrTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const dispatch = useDispatch();
  const avatar = useSelector(getUserAvatar);

  const name = useSelector(getUsername);

  const modalLogOut = useSelector(globalSelectors.getModalLogOut);
  const modalAvatar = useSelector(globalSelectors.getModalAvatar)

  const openModalAvatar = useCallback(
    () => dispatch(globalAction.openModalAvatar()),
    [dispatch]
    );

  const closeModalAvatar = useCallback(
    () => dispatch(globalAction.closeModalAvatar()),
    [dispatch]
  );
  const closeModalLogOut = useCallback(
    () => dispatch(globalAction.closeModalLogOut()),
    [dispatch]
  );

  const openModalLogOut = useCallback(
    () => dispatch(globalAction.openModalLogOut()),
    [dispatch]
    );

  const onUserLogOut = () => {
    dispatch(logOut());
    dispatch(globalAction.closeModalLogOut())
  };

  return (
    <div className={s.header__user}  >
<div className={s.darkMode}><DarkMode isDarkMode={isDarkMode}/></div>
      <button type="button" className={s.logout} onClick={openModalAvatar}>
        <div  className={s.imageContainer}>
 <img
          className={s.imageContainer}
          src={updatedNewAvatar?updatedNewAvatar:avatar}
          alt="avatar"
        />
        </div>
        </button>

        <span className={s.header__text}>{name}</span>
        <span className={s.line}>{isMobileOrTablet ? "|" : ""}</span>

        <button type="button" className={`${isDarkMode? s.logout: s.logoutDark}`}  onClick={openModalLogOut}>
          {<Logout />}
          <span className={s.exit}>{isMobileOrTablet ? "Log out" : ""}</span>
        </button>
      <Fragment>
      {modalLogOut && <LogoutModalPortal closeModal={closeModalLogOut} avatar = {updatedNewAvatar} onUserLogOut={onUserLogOut}></LogoutModalPortal>}

      </Fragment>

      <Fragment>
        {modalAvatar && <AvatarUpdateForm closeModal={closeModalAvatar} setUpdatedNewAvatar={setUpdatedNewAvatar} ></AvatarUpdateForm>}
      </Fragment>
    </div>
  );
}
