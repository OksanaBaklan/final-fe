import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import s from "./LoginForm.module.css";
import InputField from "../InputField/";
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { ReactComponent as Passwordcon } from "../../images/icon-form/password.svg";


export default function LoginForm() {


   return (
      <>
         <Formik
            initialValues={{
               password: "",
               email: "",
            }}
            validateOnBlur
            onSubmit={() => {
               console.log('onSubmitHandler')
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
               <Form className={s.formRegister}>
                  <h1>MoneyMinder</h1>
                  <div className={s.input_wrap}>

                     <InputField
                        label={<Emailcon className={s.icon} />}
                        placeholder="E-mail"
                        className={s.input}
                        type={`email`}
                        name={`email`}
                        onChange={() => "handleChange"}
                        onBlur={() => "handleBlur"}
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
                        placeholder="Password"
                        type={`password`}
                        name={`password`}
                        onChange={() => "handleChange"}
                        onBlur={() => { "handleBlur" }}
                        value={values.password}
                     />
                  </div>
                  <button
                     className={s.btn}
                     disabled={!isValid || !dirty}
                     type={`submit`}
                  >
                     Log in
                  </button>
                  <NavLink
                     to="/register"
                     className={s.btn1}
                     style={{ textDecoration: "none" }}
                  >
                     Register
                  </NavLink>
               </Form>
            )}

         </Formik>
      </>
   );
}
