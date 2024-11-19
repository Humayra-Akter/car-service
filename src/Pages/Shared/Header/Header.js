import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import logo from "../../../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      sticky="top"
      variant="dark"
    >
      <Container>
        {/* Logo Section */}
        <Navbar.Brand as={Link} to="/">
          <img height={40} src={logo} alt="Company Logo" />
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#services" className="text-white">
              Services
            </Nav.Link>
            <Nav.Link href="#experts" className="text-white">
              Experts
            </Nav.Link>
            <NavDropdown title="More" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Something Else
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated Link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* User Actions */}
          <Nav>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/addservice"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Add
                </NavLink>
                <NavLink
                  to="/manage"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Manage
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Orders
                </NavLink>
              </>
            )}
            {user ? (
              <button
                className="btn btn-outline-light ms-3"
                onClick={handleSignOut}
                aria-label="Sign Out"
              >
                Sign Out
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
