import React from "react";
import {Button} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav, Navbar} from "react-bootstrap";
import {useNavigate, NavLink, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiceD20} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const navigate = useNavigate();
    const handleNav = (path) => {
        navigate(path);
    }
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
                      <Button variant={'info'} className='me-2'>Login</Button>
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