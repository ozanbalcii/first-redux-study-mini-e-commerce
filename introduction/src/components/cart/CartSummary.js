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
    //!karttan silme işlemi
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " Deleted to cart", "success", 2);
  }

  renderEmpty() {
    //! if cart is empty:
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
    //! if cart isn't empty:
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
              cartItem //! her bir cartItem için css kodu çalıştır. ( parantez açıyorsa css kodu çalışır, süslü parantez açarsak js kodu çalışır)
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
          this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty() //! sepetteki eleman sayısı>0 ise renderSummary() yoksa renderEmpty() çalışır
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  //!(actions'ı kullanabilmek için yapıyoruz): cart'da silme işlemi için yapıoz
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

function mapStateToProps(state) {
  //!(bunu state'e bağlanmak için kullanıyoruz.) state'i props'a bağlıyoruz.
  return {
    cart: state.cartReducer, //! cartReducer state'i kullandıgımız yerdir ve state'i o yüzden burdan alıyoruz
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
