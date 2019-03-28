import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';

class NavbarCommon extends Component {
  render() {
    return (
    <div className="header-nav">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/list">List</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    </div>
    );
  }
}
export default NavbarCommon;