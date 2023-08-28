import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"

function PasswordRecovery() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")

  const {token, email} = useParams()

  const submitHandler = async(e)=>{
    e.preventDefault()
    const password = e.target["password"].value
    const confirmPassword = e.target["confirmPassword"].value

if (password !== confirmPassword) return setErrorMessage("passwords not match")

try{
    const config = {
        headers:{
            "Authorization":`Bearer ${token}`
        }
    }
    const response = await axios.put( `${process.env.REACT_APP_BE_URL}/api/users/password-reset`, {password,confirmPassword, email}, config)
    setMessage(response.data)
}catch(err){
setErrorMessage(err.response.data)
}
  }
  
  return (
    <>
      <h2>Recovery Password</h2>
      <form onSubmit={submitHandler}>
        <input type="password" name="password" placeholder="password" required />
        <input type="password" name="confirmPassword" placeholder="confirmPassword" required />

        <input type="submit" value="Reset" />
        <input
          type="button"
          value="Cancel"
          onClick={() => navigate("/login")}
        />
      </form>
      {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
      {message && <p style={{color:"green"}}>{message}</p>}
   

    </>
  );
}

export default PasswordRecovery;
