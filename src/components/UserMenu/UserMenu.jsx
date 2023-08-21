import { Fragment, useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { ReactComponent as Logout } from "../../images/icon-logout/logout.svg";

import { getUsername, getUserAvatar } from "../../redux/auth/auth-selectors";
import { logOut } from "../../redux/auth/auth-operations";

import ModalLogoutWithRedux from "../ModalLogout/ModalLogoutWithRedux";
import s from "./UserMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import AvatarUpdateForm from "./AvatarUpdateForm";
import { globalAction, globalSelectors } from "../../redux/global";

export default function UserMenu() {
  // const [showModal, setShowModal] = useState(false);
  const [updatedNewAvatar, setUpdatedNewAvatar] = useState('')

  const isMobileOrTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const dispatch = useDispatch();

  
  
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
    <div className={s.header__user}>
     
      <button type="button" className={s.logout} onClick={openModalAvatar}>
        <img
        className={s.imageContainer}
          style={{    width: '5rem',
                      height: '50px',
                      borderRadius: '20%',
                      objectFit: 'cover',}}
          src={updatedNewAvatar?updatedNewAvatar:avatar}
          width="25px"
          height="25px"
          alt="avatar"
        />
        </button>
        <span className={s.header__text}>{name}</span>
        <span className={s.line}>{isMobileOrTablet ? "|" : ""}</span>

        <button type="button" className={s.logout}  onClick={openModalLogOut}>
          {<Logout />}
          <span className={s.exit}>{isMobileOrTablet ? "Log out" : ""}</span>
        </button>
      <Fragment>
        {modalLogOut && <ModalLogoutWithRedux closeModal={closeModalLogOut} onUserLogOut={onUserLogOut}></ModalLogoutWithRedux>}
      </Fragment>

      <Fragment>
        {modalAvatar && <AvatarUpdateForm closeModal={closeModalAvatar} setUpdatedNewAvatar={setUpdatedNewAvatar} ></AvatarUpdateForm>}
      </Fragment>
    </div>
  );
}
