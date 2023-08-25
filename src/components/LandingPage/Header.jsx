import React from 'react'
import { Link } from 'react-router-dom'
import './landingPage.css'
import LogoComponent from '../LogoComponent/LogoComponent'
import Container from "../Container/Container";
import DarkMoode from '../DarkMoode/DarkMoode';


const Header = () => {
  return (
    <header className="header" id="header">
      <Container>

      <div className="headerContainer">

    <div className="logo">
      <Link to='/'>
        <LogoComponent />
      </Link>
      <ul className="main-nav">
        <li><DarkMoode/></li>
        <li>
          <Link to='/register'>
            Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
      </div>
      </Container>
  </header>
  )
}

export default Header
