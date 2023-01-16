import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import './navbar.scss';
export const Navigation = () => {

  return (
    <Container className="navigation mb-5">
      <Navbar className="navigation" expand="lg">
        <Navbar.Brand className='navbarBrand'>jessaFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className='nav'>
            <Nav.Link onClick="handleClick">Home</Nav.Link>
            <NavDropdown title="Search By Genre" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Comedy
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Thriller</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Musical</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">Adventure</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => { localStorage.clear(); window.location.reload(); }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>

  );
}
export default Navigation