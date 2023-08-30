import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import LogoComponent from "../LogoComponent/LogoComponent";
import { Formik, Form } from "formik";
import s from "./LoginForm.module.css";
import * as Yup from "yup";
import classNames from "classnames";
import InputField from "../InputField/InputField";
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { NavLink } from "react-router-dom";

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(6, "minimum 6 characters!")
    .max(50, "No more than 50 characters!!")
    .required("required"),
});


function PasswordReset() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")

  const submitHandler = async ({email}) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_BE_URL}/users/password-reset`,{email})
        setMessage(response.data)
        navigate("/login")
    }
    catch(err) {
        setErrorMessage(err.response.data)
    }

  };
  return (
    <>      
  <div className={s.container}>
    <Formik
    initialValues={{
      password: "",
      email: "",
    }}
    validateOnBlur
    onSubmit={(values, { resetForm }) => {
      submitHandler(values);
      resetForm();
    }}
    validationSchema={Schema}
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
               <button
              className={s.btn}
              disabled={!isValid || !dirty}
              type={`submit`}
            >
              reset password
            </button>
            <NavLink
              to="/register"
              className={s.btn1}
              style={{ textDecoration: "none" }}
            >
              register
            </NavLink>
      {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
      {message && <p style={{color:"green"}}>{message}</p>}
     
      </Form>)}
    </Formik>
  </div>

    </>
  );
}

export default PasswordReset;
