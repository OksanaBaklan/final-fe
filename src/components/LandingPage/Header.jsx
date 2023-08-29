import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './landingPage.css'
import LogoComponent from '../LogoComponent/LogoComponent'
import Container from "../Container/Container";
import TeamMembers from '../TeamMembers/TeamMembers';


const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const onModalToggle = () => {
    setShowModal((prev) => !prev);
  };

  const onOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onModalToggle();
    }
  };
  return (
    <header className="header" id="header">
      <Container>
      <div className="headerContainer">
    <div className="logo">
      <Link to='/'>
        <LogoComponent />
      </Link>
      <ul className="main-nav">
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li onClick={onModalToggle}>
        <Link>Contact
        </Link>
        </li>
      </ul>
      {showModal && (
        <TeamMembers
          onModalClose={onModalToggle}
          onOverlayClose={onOverlayClose}
        />
      )}
    </div>
      </div>
      </Container>
  </header>
  )
}

export default Header
