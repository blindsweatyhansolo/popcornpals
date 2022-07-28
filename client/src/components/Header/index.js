import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Auth from '../../utils/auth';

const popcorn = require('../../assets/icons/popcornlogo.png');


const Header = () => {
  // handle logout with Auth
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }

  const loggedIn = Auth.loggedIn();

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="md" className="px-2" >
      <Navbar.Brand>
        <Link to='/home' className="px-2" id="brand">
          <img src={popcorn} alt="popcornLogo" />
          Popcorn Pals
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle  aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {/*  USE AUTH TO EITHER SHOW LOGIN/SIGNUP OR PROFILE/LOGOUT */}
          {loggedIn ? (
            <>
              <Nav.Link eventKey="1" as={Link} to="/profile" className="px-2">
                {/* <Link to="/profile" className="px-2">Profile</Link> */}
                Profile
              </Nav.Link>
              <Nav.Link eventKey="2" as={Link} to="/" className="px-2" onClick={logout}>
                Logout
              </Nav.Link>
              {/* <Link to="/"  className="px-2">Logout</Link> */}
            </>
          ) : (
            <>
              <Nav.Link eventKey="1" as={Link} to="/login" className="px-2">
                Login
              </Nav.Link>
              <Nav.Link eventKey="2" as={Link} to="/signup" className="px-2">
                Sign Up
              </Nav.Link>
              {/* <Link to='/login' className="px-2">Login</Link> */}
              {/* <Link to='/signup' className="px-2">Sign Up</Link> */}
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;