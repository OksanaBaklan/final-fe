import React from 'react'
import ModalLogout from './ModalLogout';
import { useState } from 'react';

const LogoutForm = (props) => {
      const [formIsVisible, setFormIsVisible] = useState(false);

  const showFormHandler = () => {
    setFormIsVisible(true);
  };

  const hideFormHandler = () => {
    setFormIsVisible(false);
  };

    
    return (
      
    
      <div>
            {formIsVisible && <ModalLogout onHideForm={hideFormHandler} />} 
          </div>  
  )
}

export default LogoutForm;