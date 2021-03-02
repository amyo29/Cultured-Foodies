import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import "../styles/NavBar.css"

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar expand="lg" className="navbar-custom">
          <Navbar.Brand href="/" className="nav-link">
            <b>Cultured Foodies</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/about">About Us</Nav.Link>
              <Nav.Link href="/countries">Countries</Nav.Link>
              <Nav.Link href="/dishes">Dishes</Nav.Link>
              <Nav.Link href="/news">News</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
