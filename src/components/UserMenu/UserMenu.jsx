import { Fragment, useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { ReactComponent as Logout } from "../../images/icon-logout/logout.svg";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

import { getUsername, getUserAvatar } from "../../redux/auth/auth-selectors";
import { logOut } from "../../redux/auth/auth-operations";
import ModalLogout from "../ModalLogout/ModalLogout";
import s from "./UserMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import AvatarUpdateForm from "./AvatarUpdateForm";
import { globalAction, globalSelectors } from "../../redux/global";
import ModalLogoutWithRedux from "../ModalLogout/ModalLogoutWithRedux";
import { getToggleTheme } from "../../redux/global/global-selectors";
import {LogoutModalPortal} from "../ModalLogout/modalLogOutPortal";

export default function UserMenu() {
  // const [showModal, setShowModal] = useState(false);
  const [updatedNewAvatar, setUpdatedNewAvatar] = useState('')

  const isMobileOrTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const dispatch = useDispatch();

  const {darkTheme} = useSelector(getToggleTheme);
console.log(darkTheme)
  
  const name = useSelector(getUsername);
  const avatar = useSelector(getUserAvatar);
  
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

      <div className={s.darkmode}>
          <input
          type="checkbox"
          className={s.checkbox}
          id="checkbox"
          // onChange prop to fire our internal function for changing the dark mode value
          // onChange={switchDarkMode}
          // checking checked prop with dark mode state
          // checked={isdarkMode}
        />
        <label htmlFor="checkbox" className={s.label}>
          <BsMoonStarsFill color="white" />
          <BsFillSunFill color="yellow" />
          <div className={s.ball}></div>
        </label>
      </div>


      <button type="button" className={s.logout} onClick={openModalAvatar}>
        <div >
        <img
          className={s.imageContainer}
          src={updatedNewAvatar?updatedNewAvatar:avatar}

          alt="avatar"
        />
        </div>
        </button>

        <span className={s.header__text}>{name}</span>
        <span className={s.line}>{isMobileOrTablet ? "|" : ""}</span>

        <button type="button" className={s.logout}  onClick={openModalLogOut}>
          {<Logout />}
          <span className={s.exit}>{isMobileOrTablet ? "Log out" : ""}</span>
        </button>
      <Fragment>
      {modalLogOut && <LogoutModalPortal closeModal={closeModalLogOut}  onUserLogOut={onUserLogOut}></LogoutModalPortal>} 
      {/* {modalLogOut && <ModalLogout closeModal={closeModalLogOut}  onUserLogOut={onUserLogOut}></ModalLogout>} */}
      {/* {modalLogOut && <ModalLogoutWithRedux closeModal={closeModalLogOut} onUserLogOut={onUserLogOut}></ModalLogoutWithRedux>} */}
      </Fragment>

      <Fragment>
        {modalAvatar && <AvatarUpdateForm closeModal={closeModalAvatar} setUpdatedNewAvatar={setUpdatedNewAvatar} ></AvatarUpdateForm>}
      </Fragment>
    </div>
  );
}
