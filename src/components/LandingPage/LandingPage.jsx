
import Container from '../Container/Container'
import { Link } from 'react-router-dom'
import LogoComponent from '../LogoComponent/LogoComponent'
import './landingPage.css'

const LandingPage = () => {
  return (
    <>
      <header className="header" id="header">
        <Container>
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
        </Container>
      </header>
    </>
  )
}

export default LandingPage
