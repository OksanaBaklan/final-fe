// import React, { useEffect, useState } from 'react';
// import s from "./AvatarUpdateForm.module.css";
// import closeIcon from "../../images/modal-transaction/close.svg";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import classNames from "classnames";
// import { useDispatch, useSelector } from 'react-redux';
// import { avatarUpdate } from '../../redux/auth/auth-operations';

// const AvatarUpdateForm = ({closeModal, setAvatar}) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false)

// const navigate = useNavigate()


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

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };
//   const dispatch = useDispatch();
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedFile) {
//       return;
//     }
//     const formData = new FormData();
//     formData.append('image', selectedFile);
//     setIsLoading(true)
//     dispatch(avatarUpdate(formData))

//       setIsLoading(false)
//       e.target.reset()
//       navigate("/")
//       closeModal();

//   }

//   return (
//     <div  className={s.overlay} onClick={onBackdropClick} >

//       <div className={s.formBox}>

//       <form onSubmit={handleSubmit}  className={s.form}>
// {isLoading && (      <div className={s.loaderContainer}>
//         <div className={s.loader}></div>
//       </div>)}
//       <button type='button' className={s.closeBtn} onClick={closeModal}>
//               <img src={closeIcon} alt='' />
//             </button>
//         <div>
//           <label className={s.modalDescription} >Choose new avatar</label>
//           <input
//           className={s.avatarInput}
//             type="file"
//             id="avatar"
//             name="image"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//         </div>
//         <button
//         className={classNames(s.btn, s.btnAdd)}
//         type="submit">Update Avatar</button>
//       </form>
//       </div>
//     </div>
//   );
// };

// export default AvatarUpdateForm;
import React, { useEffect, useState } from 'react';
import s from "./AvatarUpdateForm.module.css";
import closeIcon from "../../images/modal-transaction/close.svg";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import classNames from "classnames";




const AvatarUpdateForm = ({closeModal, setUpdatedNewAvatar}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

const navigate = useNavigate()


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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      return;
    }


const formData = new FormData();
    formData.append('image', selectedFile);
    setIsLoading(true)
    try {
      const dataAvatar = await axios.patch(`${process.env.REACT_APP_BE_URL}/users/avatars`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUpdatedNewAvatar(dataAvatar.data.data.avatar)
      setIsLoading(false)

      e.target.reset()
      navigate("/")
      closeModal();
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  }

  return (
    <div  className={s.overlay} onClick={onBackdropClick} >

      <div className={s.formBox}>

      <form onSubmit={handleSubmit}  className={s.form}>
{isLoading && (      <div className={s.loaderContainer}>
        <div className={s.loader}></div>
      </div>)}
      <button type='button' className={s.closeBtn} onClick={closeModal}>
              <img src={closeIcon} alt='' />
            </button>
        <div>
          <label className={s.modalDescription} >Choose new avatar</label>
          <input
          className={s.avatarInput}
            type="file"
            id="avatar"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button
        className={classNames(s.btn, s.btnAdd)}
        type="submit">Update Avatar</button>
      </form>
      </div>
    </div>
  );
};

export default AvatarUpdateForm;