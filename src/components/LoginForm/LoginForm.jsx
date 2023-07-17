import { NavLink, useNavigate } from "react-router-dom";
import s from "./LoginForm.module.css";
import classNames from "classnames";
import LogoComponent from "../LogoComponent/LogoComponent"
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { ReactComponent as Passwordcon } from "../../images/icon-form/password.svg";
import { useContext, useState } from "react";
import axios from "axios"
import { UserContext } from "../../storeContext/UserContext";
// import { types } from "../../storeContext/authReducer/authReducer";
// import { AuthContext } from "../../storeContext/authContext/AuthContext";


export default function LoginForm() {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate()

  // const {dispatch}=useContext(AuthContext)
  const { user, setUser, balance, setBalance, setToken, authenticated, setAuthenticated } = useContext(UserContext);
      console.log(authenticated)

  const handleSubmit = async(e) => {
      e.preventDefault();
  
      try{
        const userCredential = {
          email: e.target["email"].value,
          password: e.target["password"].value
        }
      const response = await axios.post(`http://localhost:5555/api/users/login`,userCredential)
      console.log(response.data)
      localStorage.setItem("my-app-token", JSON.stringify(response.data.token))
           

      // dispatch({
      //   type:types.AUTH_USER,
      //   payload:userCredential
      // })
      e.target.reset()
      // setAuthenticated(true)
      // setUserName(response.data.data.userName)
      // setUserId(response.data.data.userId)
      // setAvatar(response.data.data.avatar)
      navigate("/")
       setAuthenticated(true)
      console.log(authenticated)
      setBalance(response.data.balance)
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
            {showError 
          && <p style={{color:'red'}}>{showError}</p>}
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
