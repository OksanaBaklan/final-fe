import React from 'react'
import { Link } from 'react-router-dom'
import './landingPage.css'
import LogoComponent from '../LogoComponent/LogoComponent'


const Header = () => {
  return (
    <header className="header" id="header">
    <div className="logo">
      <Link to='/'>
        <LogoComponent />
      </Link>
      <ul className="main-nav">
        <li>
          <Link to='/register'>
            Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  </header>
  )
}

export default Header
