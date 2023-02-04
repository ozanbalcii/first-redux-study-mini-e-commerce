import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";

import CartSummary from "../cart/CartSummary";

export default class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="secondary" light expand="md">
          <h1>
            <Badge color="danger">
              <NavLink href="/">Nort Wind</NavLink>
            </Badge>
          </h1>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <h3>
                  <Badge color="light">
                    <NavLink
                      href="https://www.linkedin.com/in/ozanbalci98/"
                      target="_blank"
                    >
                      Linkledin
                    </NavLink>
                  </Badge>
                </h3>
              </NavItem>
              <NavItem>
                <h3>
                  <Badge color="light">
                    <NavLink
                      href="https://github.com/ozanbalcii"
                      target="_blank"
                    >
                      GitHub
                    </NavLink>
                  </Badge>
                </h3>
              </NavItem>
              <CartSummary />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
