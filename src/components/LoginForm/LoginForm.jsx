import { NavLink, useNavigate } from "react-router-dom";
import s from "./LoginForm.module.css";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import classNames from "classnames";
import LogoComponent from "../LogoComponent/LogoComponent";
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { ReactComponent as Passwordcon } from "../../images/icon-form/password.svg";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../storeContext/UserContext";
import { loginUser } from "../../redux/auth/auth-operations";
import { useDispatch } from "react-redux";
// import { types } from "../../storeContext/authReducer/authReducer";
// import { AuthContext } from "../../storeContext/authContext/AuthContext";
import InputField from "../InputField/InputField";


const SignupSchema = Yup.object().shape({
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

export default function LoginForm() {

  // const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = ({ email, password }) => {
  
    dispatch(loginUser({ email, password }));

  };

  // const {
  //   user,
  //   setUser,
  //   balance,
  //   setToken,
  //   authenticated,
  //   setAuthenticated,
  // } = useContext(UserContext);
  // console.log(authenticated);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const userCredential = {
  //       email: e.target["email"].value,
  //       password: e.target["password"].value,
  //     };
  //     const response = await axios.post(
  //       `http://localhost:5555/api/users/login`,
  //       userCredential,
  //     );
  //     console.log(response.data);
  //     localStorage.setItem("my-app-token", JSON.stringify(response.data.token));

  //     // dispatch({
  //     //   type:types.AUTH_USER,
  //     //   payload:userCredential
  //     // })
  //     e.target.reset();
  //     // setAuthenticated(true)
  //     // setUserName(response.data.data.userName)
  //     // setUserId(response.data.data.userId)
  //     // setAvatar(response.data.data.avatar)
  //     navigate("/");
  //     setAuthenticated(true);
  //     console.log(authenticated);
  //     // setBalance(response.data.balance);
  //   } catch (err) {
  //     setShowError(err.response.data);
  //   }
  // };
  return (
    <>
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={SignupSchema}
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
          <Form className={s.formRegister}>
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
            <button
              className={s.btn}
              disabled={!isValid || !dirty}
              type={`submit`}
            >
              log in
            </button>
            <NavLink
              to="/register"
              className={s.btn1}
              style={{ textDecoration: "none" }}
            >
              register
            </NavLink>
          </Form>
        )}
      </Formik>

      {/* <form className={s.formRegister} onSubmit={handleSubmit}>
        <LogoComponent />
        <div className={classNames(s.input_wrap, s.inputTop)}>
          <input
            label={<Emailcon className={s.icon} />}
            placeholder="E-mail"
            className={s.input}
            type="email"
            name="email"
            required
          />
        </div>
        <div className={s.input_wrap}>
          <input
            label={<Passwordcon className={s.icon} />}
            className={s.input}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        {showError && <p style={{ color: "red" }}>{showError}</p>}
        <input type="submit" value="log in" className={s.btn} />

        <NavLink
          to="/register"
          className={s.btn1}
          style={{ textDecoration: "none" }}
        >
          register
        </NavLink>
      </form> */}
    </>
  );
}
