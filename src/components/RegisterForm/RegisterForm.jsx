import { NavLink,} from "react-router-dom";
import * as Yup from "yup";
// import LogoComponent from "../LogoComponent";
import s from "./RegisterForm.module.css";
import { ReactComponent as NameIcon } from "../../images/icon-form/name.svg";
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { ReactComponent as Passwordcon } from "../../images/icon-form/password.svg";
import classNames from "classnames";
import { useState } from "react";
import LogoComponent from "../LogoComponent/LogoComponent";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/auth/auth-operations";
import { Formik, Form } from "formik";
import InputField from "../InputField/InputField"
import ProgressSwitch from "../RegisterForm/ProgressSwitch"

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Incorrect Email")
    .min(6, "minimum 6 characters!")
    .required("required"),
  password: Yup.string()
    .typeError("Must be a string")
    .min(6, "minimum 6 characters!")
    .max(12, "No more than 12 characters!")
    .required("required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password mismatch")
    .required("required"),
  userName: Yup.string()
    .typeError()
    .min(2, "minimum 2 characters!")
    .max(32, "No more than 32 characters!")
    .required("required"),
});

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = ({ userName, email, password }) => {
    try {
      dispatch(authUser({ userName, email, password }));
    } catch (error) {
      setErrorMessage(error.request.response);
    }
  };


  return (
    <>
    <Formik
      initialValues={{
        userName: "",
        password: "",
        confirmPassword: "",
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
              type="email"
              name="email"
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
              type="password"
              name="password"
              error={errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </div>
          <div className={s.input_wrap}>
            {touched.confirmPassword && errors.confirmPassword && (
              <span className={s.error}>{errors.confirmPassword}</span>
            )}
            <InputField
              label={<Passwordcon className={s.icon} />}
              placeholder="Confirm the password"
              className={s.input}
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              style={{ marginBottom: "5px" }}
            />
          </div>
          <ProgressSwitch value={values.password.length} />
          <div className={s.input_wrap}>
            {touched.userName && errors.userName && (
              <span className={s.error}>{errors.userName}</span>
            )}
            <InputField
              label={<NameIcon className={s.icon} />}
              placeholder="Your name"
              className={s.input}
              type="text"
              name="userName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName}
            />
          </div>
          <button
            className={s.btn}
            disabled={!isValid || !dirty}
            type="submit"
          >
            Registration
          </button>
          {/* {errorMessage&&<p style={{color:'red'}}>{errorMessage}</p>} */}
          <NavLink
            to="/login"
            className={s.btn1}
            style={{ textDecoration: "none" }}
          >
            Log in
          </NavLink>
        </Form>
      )}
    </Formik>
  </>
    // <>
    //       <form className={s.formRegister} onSubmit={handleSubmit}>
    //         <LogoComponent />
    //         <div className={classNames(s.input_wrap, s.inputTop)}>
    //           <input
    //             label={<Emailcon className={s.icon} />}
    //             placeholder="E-mail"
    //             className={s.input}
    //             type="email"
    //             name="email"
    //             required
    //           />
    //         </div>
    //         <div className={s.input_wrap}>
    //           <input
    //             label={<Passwordcon className={s.icon} />}
    //             className={s.input}
    //             placeholder="password"
    //             type="password"
    //             name="password"
    //             required
    //           />
    //         </div>
    //         <div className={s.input_wrap}>
    //           <input
    //             label={<Passwordcon className={s.icon} />}
    //             placeholder="confirm password "
    //             className={s.input}
    //             type="password"
    //             name="confirmPassword"
    //             // style={{ marginBottom: "5px" }}
    //           />
    //         </div>
    //         {/* <ProgressSwitch value={values.password.length} /> */}
    //         <div className={s.input_wrap}>
    //           <input
    //             label={<NameIcon className={s.icon} />}
    //             placeholder="name"
    //             className={s.input}
    //             type="text"
    //             name="userName"
    //           />
    //         </div>
    //         {/* <div className={s.input_wrap}>
    //         <input
    //                         className={s.input}

    //       type="file"
    //       name="avatar"
    //       onChange={(e)=>setUserImage(e.target.files[0])}
    //     />
    //         </div> */}


    //         {/* <input type="submit"   className={s.btn}  value="Register" /> */}

    //     <input type="submit" className={s.btn} value="Register" />

    //     <NavLink
    //       to="/login"
    //       className={s.btn1}
    //       style={{ textDecoration: "none" }}
    //     >
    //       log in
    //     </NavLink>
    //   </form>
    // </>
  );
}
