import React from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiceD20} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <Navbar>
            <Container fluid>
              <Navbar.Brand href={"/"} className="menu-link"
                style={{"color": "darkblue"}}>
                  <FontAwesomeIcon icon={faDiceD20} />
                  <Nav
                      className="me-auto my-2 my-lg-0"
                      style={{maxHeight: '100px'}}
                      navbarScroll>
                      <Button variant={'info'} className='me-2'>
                          <NavLink to={"/login"}>Login</NavLink>
                      </Button>
                      <Button variant={'info'} className='me-2'>
                          <NavLink to={"/register"}>Register</NavLink>
                      </Button>
                  </Nav>
                  <Navbar.Toggle />
              </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header