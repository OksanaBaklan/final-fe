import React, { useEffect, useState } from 'react';
import s from "./AvatarUpdateForm.module.css";
import closeIcon from "../../images/modal-transaction/close.svg";
import { useNavigate } from 'react-router-dom';
import axios from "axios";




const AvatarUpdateForm = ({closeModal, setUpdatedNewAvatar}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  console.log(selectedFile)

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

    // const formData = new FormData()

    // formData.append('avatar', e.target.elements[0].files[0])
// http://localhost:5555/api/users/avatars

const formData = new FormData();
    formData.append('image', selectedFile);
    console.log(selectedFile)

    try {
      const dataAvatar = await axios.patch(`http://localhost:5555/api/users/avatars`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log('Avatar uploaded successfully', dataAvatar.data.data.avatar);
      setUpdatedNewAvatar(dataAvatar.data.data.avatar)
      e.target.reset()
      navigate("/")
      closeModal();
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  }

  return (
    <div  className={s.overlay} onClick={onBackdropClick} >
              <button type='button' className={s.closeBtn} onClick={closeModal}>
              <img src={closeIcon} alt='' />
            </button>
      <div className={s.formBox}>
        
      <form onSubmit={handleSubmit}  className={s.form}>
      <h2>Update Avatar</h2>

        <div>
          <label className={s.modalDescription} htmlFor="avatar">Choose new avatar:</label>
          <input
            type="file"
            id="avatar"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Avatar</button>
      </form>
      </div>
    </div>
  );
};

export default AvatarUpdateForm;