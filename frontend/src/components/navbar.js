import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">AIDA Evaluation Framework</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/datasets/">EDA</Nav.Link>
          <Nav.Link to="/">Train</Nav.Link>
          <Nav.Link to="/">Evaluate</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
    );
  }
}

export default NavBar;
