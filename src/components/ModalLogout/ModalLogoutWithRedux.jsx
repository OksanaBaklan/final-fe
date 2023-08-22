import s from "./ModalLogout.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import closeIcon from "../../images/modal-transaction/close.svg";



function ModalLogoutWithRedux({ closeModal, onUserLogOut }) {

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      closeModal();
    }
  };

  const onBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <div className={s.overlay} onClick={onBackdropClick}>
        <div>
        <button type='button' className={s.closeBtn} onClick={closeModal}>
              <img src={closeIcon} alt='' />
            </button>
            <div className={s.modal}>
        <p className={s.title}>Do you really want to log out?</p>
        <button className={s.cansellBtn} type='button' onClick={closeModal}>
          NO
        </button>
        <button className={s.agreeBtn} type='button' onClick={onUserLogOut}>
          YES
        </button>

      </div>
        </div>
      </div>
    </>
  );
}

export default ModalLogoutWithRedux;
