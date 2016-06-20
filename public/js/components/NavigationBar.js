import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

export default class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/'><NavItem >S3 Uploader</NavItem></LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to='UploadFile'><NavItem eventKey={1}>Upload File</NavItem></LinkContainer>
            <LinkContainer to='ListFile'><NavItem eventKey={2}>List Content</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
