import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import s from "./LoginForm.module.css";
import LogoComponent from "../LogoComponent/LogoComponent";
import { Formik, Form } from "formik";
import classNames from "classnames";
import InputField from "../InputField/InputField";
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { ReactComponent as Passwordcon } from "../../images/icon-form/password.svg";

import { NavLink } from "react-router-dom";

function PasswordRecovery() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")

  const {token} = useParams()

  const submitHandler = async({password,confirmPassword, email})=>{

if (password !== confirmPassword) return setErrorMessage("passwords not match")

try{
    const config = {
        headers:{
            "Authorization":`Bearer ${token}`
        }
    }
    const response = await axios.put( `${process.env.REACT_APP_BE_URL}/users/password-reset`, {password,confirmPassword, email}, config)
    setMessage(response.data)
    navigate("/login")

}catch(err){
setErrorMessage(err.response.data)
}
  }
  
  return (
    <>
      <div className={s.container}>
      <Formik
    initialValues={{
      password: "",
      confirmPassword:'',
      email: "",
    }}
    validateOnBlur
    onSubmit={(values, { resetForm }) => {
      submitHandler(values);
      resetForm();
    }}
  >
    {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
    <Form className={s.formReset }>
       <LogoComponent />
       <div className={classNames(s.input_wrap, s.inputTop)}>
       {touched.email && errors.email && (
                <span className={s.error}>{errors.email}</span>
              )}
              <InputField
                label={<Emailcon className={s.icon} />}
                placeholder="E-mail"
                className={s.input}
                type={`email`}
                name={`email`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
               </div>     
               <div className={s.input_wrap}>
              {touched.password && errors.password && (
                <span className={s.error}>{errors.password}</span>
              )}
              <InputField
                label={<Passwordcon className={s.icon} />}
                className={s.input}
                placeholder="password"
                type={`password`}
                name={`password`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>       
            <div className={s.input_wrap}>
              {touched.password && errors.password && (
                <span className={s.error}>{errors.password}</span>
              )}
              <InputField
                label={<Passwordcon className={s.icon} />}
                className={s.input}
                placeholder="confirm new password"
                type={`password`}
                name={`confirmPassword`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
            </div>  
               <button
              className={s.btn}
              disabled={!isValid || !dirty}
              type={`submit`}
            >
              recovery password
            </button>
            <NavLink
              to="/register"
              className={s.btn1}
              style={{ textDecoration: "none" }}
            >
              register
            </NavLink>
      {errorMessage && <p style={{color:"red", marginTop:"1rem"}}>{errorMessage}</p>}
      {message && <p style={{color:"green"}}>{message}</p>}

      </Form>)}
      </Formik>
    </div>

    </>
  );
}

export default PasswordRecovery;
