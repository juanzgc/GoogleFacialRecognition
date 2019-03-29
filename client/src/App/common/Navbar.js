import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';

class NavbarCommon extends Component {
  render() {
    return (
    <div className="header-nav">
      <Navbar style={navStyle} variant="dark" >
        <Navbar.Brand href="/">CS411</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/list">List</Nav.Link>
        </Nav>
      </Navbar>
    </div>
    );
  }
}

const navStyle = {
  backgroundColor: '#20232a',
  minHeight: 60
}

export default NavbarCommon;