import { NavLink } from "react-router-dom";
import s from "./LoginForm.module.css";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import classNames from "classnames";
import LogoComponent from "../LogoComponent/LogoComponent";
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { ReactComponent as Passwordcon } from "../../images/icon-form/password.svg";
import { loginUser } from "../../redux/auth/auth-operations";
import { useDispatch } from "react-redux";
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


  const dispatch = useDispatch();

  const handleSubmit = ({ email, password }) => {
    dispatch(loginUser({ email, password }));
  };


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
            <p style={{color:"black", marginTop:"1rem"}}>Forgot your password? <NavLink to="/password-reset">Click Here!</NavLink></p>

          </Form>
        )}
      </Formik>

    </>
  );
}
