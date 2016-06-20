import React from 'react';
import * as Bootstrap from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;

export default class NavBar extends React.Component {

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/"><a href="/">S3 Uploader</a></LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/file-upload">
              <NavItem eventKey={0}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/show-all">
              <NavItem eventKey={1}>Show All</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
