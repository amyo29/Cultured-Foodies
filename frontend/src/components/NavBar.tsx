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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Country from "../pages/Countries";
import Recipes from "../pages/Recipes";
import News from "../pages/News";

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <b>Cultured Foodies</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/about">About Us</Nav.Link>
              <Nav.Link href="/countries">Countries</Nav.Link>
              <Nav.Link href="/recipes">Recipes</Nav.Link>
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
        <Router>
          <div>
            <Route exact path="/">
              <Home />
            </Route>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/countries">
                <Country />
              </Route>
              <Route path="/recipes">
                <Recipes />
              </Route>
              <Route path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default NavBar;
