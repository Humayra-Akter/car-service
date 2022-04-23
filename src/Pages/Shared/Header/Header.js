import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css'
import logo from '../../../images/logo.png'

const Header = () => {
      return (
            <>
                  <Navbar bg="primary" variant="dark">
                        <Container>
                              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                              <img src={logo} height="30" alt="" />
                              <Nav className="me-auto">
                                    <Nav.Link href="#home">Home</Nav.Link>
                                    <Nav.Link href="#features">Features</Nav.Link>
                                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                              </Nav>
                        </Container>
                  </Navbar>
            </>
      );
};

export default Header;