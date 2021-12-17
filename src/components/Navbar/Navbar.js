import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <div className="container-md">
        <Navbar.Brand href="#home">ACM Gia Định</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
