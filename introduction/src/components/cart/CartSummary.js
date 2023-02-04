import React, { Component } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";

class CartSummary extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " Deleted to cart", "success", 2);
  }

  renderEmpty() {
    return (
      <NavItem>
        <h3>
          <Badge color="warning" pill>
            <NavLink>Empty Cart</NavLink>
          </Badge>
        </h3>
      </NavItem>
    );
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
          <Badge color="success">
            <h5> <DropdownToggle nav caret>
              Your Cart
            </DropdownToggle></h5>
          </Badge>
        <DropdownMenu right>
          {this.props.cart.map(
            (
              cartItem 
            ) => (
              <DropdownItem key={cartItem.product.id}>
                <Badge
                  color="danger"
                  onClick={() => this.removeFromCart(cartItem.product)}
                >
                  X
                </Badge>
                 {cartItem.product.productName}
                <Badge color="success"> {cartItem.quantity}</Badge>
              </DropdownItem>
            )
          )}
          <DropdownItem divider />
          <Badge color="warning">
            <DropdownItem>
              <Link to={"/cart"}>Go to cart </Link>
            </DropdownItem>
          </Badge>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div>
        {
          this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty() 
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer, 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
