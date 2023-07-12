import { Formik, Form } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./LoginForm.module.css";
import classNames from "classnames";
import LogoComponent from "../LogoComponent/LogoComponent"
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { ReactComponent as Passwordcon } from "../../images/icon-form/password.svg";
import { useState } from "react";
import axios from "axios"


export default function LoginForm(props) {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate()
  const {setAuthenticated, setUserName, setUserId, authenticated, setAvatar} = props

  const handleSubmit = async(e) => {
      e.preventDefault();
  
      try{
        const userCredential = {
          email: e.target["email"].value,
          password: e.target["password"].value
        }
      const response = await axios.post(`http://localhost:5555/api/users/login`,userCredential)
      // console.log(response.data)
      localStorage.setItem("my-app-token", JSON.stringify(response.data.data.token))
      e.target.reset()
      setAuthenticated(true)
      setUserName(response.data.data.userName)
      setUserId(response.data.data.userId)
      setAvatar(response.data.data.avatar)
      navigate("/")
      }
      catch(err){
        setShowError(err.response.data)
      }

  };
  return (
    <>
            <form className={s.formRegister} onSubmit={handleSubmit}>
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

            <input type="submit" value="log in" className={s.btn}/>

            <NavLink
              to="/register"
              className={s.btn1}
              style={{ textDecoration: "none" }}
            >
             register
            </NavLink>
          </form>

 
    </>
  );
}
