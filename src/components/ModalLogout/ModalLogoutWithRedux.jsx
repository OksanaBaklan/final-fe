// import s from "./ModalLogout.module.css";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import closeIcon from "../../images/modal-transaction/close.svg";



// function ModalLogoutWithRedux({ closeModal }) {

//   const handleKeyDown = (event) => {
//     if (event.code === "Escape") {
//       closeModal();
//     }
//   };

//   const onBackdropClick = (event) => {
//     if (event.target === event.currentTarget) {
//       closeModal();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   });

//   return (
//     <>
//       <div className={s.overlay} onClick={onBackdropClick}>
//         <div>
//         <button type='button' className={s.closeBtn} onClick={closeModal}>
//               <img src={closeIcon} alt='' />
//             </button>
//           <h1>ModalLogout</h1>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ModalLogoutWithRedux;
