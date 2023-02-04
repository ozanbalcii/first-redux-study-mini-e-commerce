import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import {Table, Button } from "reactstrap";
import alertify from "alertifyjs";


class CartDetail extends Component {

    removeFromCart(product){ //!karttan silme işlemi
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + " Deleted to cart", "success", 2);
    }

  render() {
    return (
      <div>
        <Table dark>
          <thead>
            <tr className="table-dark">
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((cartItem) => (
              <tr key={cartItem.id}>
                <th scope="row">{cartItem.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem.product)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
