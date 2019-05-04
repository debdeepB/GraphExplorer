import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar className="fixed-top" bg="dark" variant="dark">
        <Navbar.Brand href="/">AIDA Evaluation Framework</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/datasets/">Datasets</Nav.Link>
          <Nav.Link href="/evaluate/">Evaluate</Nav.Link>
          <Nav.Link href="/tabview/">TabView</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
