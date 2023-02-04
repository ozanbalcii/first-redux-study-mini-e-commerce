import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        (c) => c.product.id === action.payload.product.id
      ); //!eklenen ürün daha önce sepette var mı kontrolü
      if (addedItem) {
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            });
          }
          return cartItem;
        });
        return newState;
      } else {
        return [...state, { ...action.payload }]; //! array'in kopyasını alıp eleman ekle---> state'in kopyasını al ve action ile gelen payload'a ekle
      }
      case actionTypes.REMOVE_FROM_CART:
        const newState2 = state.filter(cartItem=> cartItem.product.id!==action.payload.id) //! when ids are not equal, filter
        return newState2;
    default:
      return state;
  }
}
