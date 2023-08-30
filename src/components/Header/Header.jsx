import s from "./Header.module.css";

import LogoComponent from "../LogoComponent/LogoComponent";
import UserMenu from "../UserMenu/UserMenu";
import Container from "../Container/Container";
import { useSelector } from "react-redux";
import { getToggleTheme } from "../../redux/global/global-selectors";
import { getLoadingAvatar, getUserAvatar } from "../../redux/auth/auth-selectors";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Header() {
  const [avatar, setAvatar] = useState("")
  console.log(avatar)

  const theme = useSelector(getToggleTheme)
  // const avatar = useSelector(getUserAvatar);
  const isLoading = useSelector(getLoadingAvatar)
  // console.log(isLoading)
  // axios.defaults.baseURL = "http://localhost:5555/api"
  axios.defaults.baseURL= process.env.REACT_APP_BE_URL
  useEffect(()=>{
      axios.get("/users/current")
      .then((res)=>{
        setAvatar(res.data.data.avatar)
      })
      .catch((err) => {
        if(err.response.status === 401)
        localStorage.removeItem("my-app-token");
        console.log(err.message)
      })
      },[])

  return (isLoading?(<LoaderComponent/>):
   ( <header className={`${!theme.isDarkMode ? s.headerDark : s.header}`}>
      <Container>
        <div className={s.headerContainer}>
          <LogoComponent />
          <UserMenu  isLoading = {isLoading}setAvatar={setAvatar} isDarkMode = {theme.isDarkMode} avatar={avatar}/>
        </div>
      </Container>
    </header>)
  );
}
