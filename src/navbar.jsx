import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import './navbar.scss';
import { MainView } from './components/main-view/main-view';
import { MovieView } from './components/movie-view/movie-view';
import { Button } from 'bootstrap';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';


export const Navigation = ({ user, onLoggedOut }) => {


  return (
    <Container className="navigation mb-5">
      <Navbar className="navigation" expand="lg">
        <Navbar.Brand as={Link} to="/">
          jessaFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className='nav'>
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>

  );
}
export default Navigation