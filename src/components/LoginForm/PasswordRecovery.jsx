import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import s from "./LoginForm.module.css";
import LogoComponent from "../LogoComponent/LogoComponent";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import InputField from "../InputField/InputField";
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { ReactComponent as Passwordcon } from "../../images/icon-form/password.svg";

import { NavLink } from "react-router-dom";

const RSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(6, "minimum 6 characters!")
    .max(50, "No more than 50 characters!!")
    .required("required"),
  password: Yup.string()
    .typeError("Must be a string")
    .min(6, "minimum 6 characters!")
    .max(12, "No more than 12 characters!")
    .required("required"),
});

function PasswordRecovery() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")

  const {token, email} = useParams()

  const submitHandler = async({password,confirmPassword, email})=>{
    // e.preventDefault()
    // const password = e.target["password"].value
    // const confirmPassword = e.target["confirmPassword"].value

if (password !== confirmPassword) return setErrorMessage("passwords not match")

try{
    const config = {
        headers:{
            "Authorization":`Bearer ${token}`
        }
    }
    const response = await axios.put( `${process.env.REACT_APP_BE_URL}/api/users/password-reset`, {password,confirmPassword, email}, config)
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
    // validationSchema={RSchema}
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

      {/* <form onSubmit={submitHandler}>
        <input type="password" name="password" placeholder="password" required />
        <input type="password" name="confirmPassword" placeholder="confirmPassword" required />

        <input type="submit" value="Reset" />
        <input
          type="button"
          value="Cancel"
          onClick={() => navigate("/login")}
        />
      </form> */}

      </Formik>
    </div>

    </>
  );
}

export default PasswordRecovery;
