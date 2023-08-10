import s from "./ModalLogout.module.css";

function ModalLogout({ onOverlayClose }) {
  return (
    <>
      <div className={s.overlay} onClick={onOverlayClose}>
        <div>
          <h1>ModalLogout</h1>
        </div>
      </div>
    </>
  );
}

export default ModalLogout;
