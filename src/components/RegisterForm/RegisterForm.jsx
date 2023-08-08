import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import LogoComponent from "../LogoComponent";
import s from "./RegisterForm.module.css";
import { ReactComponent as NameIcon } from "../../images/icon-form/name.svg";
import { ReactComponent as Emailcon } from "../../images/icon-form/email.svg";
import { ReactComponent as Passwordcon } from "../../images/icon-form/password.svg";
import classNames from "classnames";
import { useState } from "react";
import axios from "axios";
import LogoComponent from "../LogoComponent/LogoComponent";

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [userImage, setUserImage] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    //   console.log("formData")

    e.preventDefault();
    const userProfile = {
      userName: e.target["userName"].value,
      password: e.target["password"].value,
      confirmPassword: e.target["confirmPassword"].value,
      email: e.target["email"].value,
    };
    //   const formData = new FormData()

    //   for(let i = 0; i < e.target.elements.length -1 ; i++)
    //   {
    //     if(e.target.elements[i].name === 'avatar')
    //     formData.append('image', e.target.elements[i].files[0])
    //     else
    //     formData.append(e.target.elements[i].name, e.target.elements[i].value)
    //   }
    try {
      const response = await axios.post(
        `http://localhost:5555/api/users/signup`,
        userProfile,
      );
      e.target.reset();
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.request.response);
    }
    console.log(userProfile);
  };
  return (
    <>
<<<<<<< HEAD
          <form className={s.formRegister} onSubmit={submitHandler}>
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
                placeholder="password"
                type="password"
                name="password"
                required
              />
            </div>
            <div className={s.input_wrap}>
              <input
                label={<Passwordcon className={s.icon} />}
                placeholder="confirm password "
                className={s.input}
                type="password"
                name="confirmPassword"
                // style={{ marginBottom: "5px" }}
              />
            </div>
            {/* <ProgressSwitch value={values.password.length} /> */}
            <div className={s.input_wrap}>
              <input
                label={<NameIcon className={s.icon} />}
                placeholder="name"
                className={s.input}
                type="text"
                name="userName"
              />
            </div>
            {/* <div className={s.input_wrap}>
            <input 
                            className={s.input}

          type="file"
          name="avatar"
          onChange={(e)=>setUserImage(e.target.files[0])}
        />
            </div> */}


            <input type="submit"   className={s.btn}  value="Register" />
=======
      <form className={s.formRegister} onSubmit={submitHandler}>
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
            placeholder="password"
            type="password"
            name="password"
            required
          />
        </div>
        <div className={s.input_wrap}>
          <input
            label={<Passwordcon className={s.icon} />}
            placeholder="confirm password "
            className={s.input}
            type="password"
            name="confirmPassword"
            // style={{ marginBottom: "5px" }}
          />
        </div>
        {/* <ProgressSwitch value={values.password.length} /> */}
        <div className={s.input_wrap}>
          <input
            label={<NameIcon className={s.icon} />}
            placeholder="name"
            className={s.input}
            type="text"
            name="userName"
          />
        </div>
        <div className={s.input_wrap}>
          <input
            className={s.input}
            type="file"
            name="avatar"
            onChange={(e) => setUserImage(e.target.files[0])}
          />
        </div>
>>>>>>> main

        <input type="submit" className={s.btn} value="Register" />

        <NavLink
          to="/login"
          className={s.btn1}
          style={{ textDecoration: "none" }}
        >
          log in
        </NavLink>
      </form>
    </>
  );
}
