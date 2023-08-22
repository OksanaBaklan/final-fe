
import Container from '../Container/Container'
import { Link } from 'react-router-dom'
import LogoComponent from '../LogoComponent/LogoComponent'
import './landingPage.css'
// import gifAnimation from './isometric-idea-for-business-success-1.gif';


const LandingPage = () => {
  return (
    <>
        <Container>
      <header className="header" id="header">
        <div  className="logo">
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
      {/* <img src={gifAnimation} alt="Animated GIF" style={{ width: '250px' }} /> */}
        </Container>
    </>
    
  )
}

export default LandingPage
