//! son eklenen/güncellenen ürün bilgisini elde etmek için reducer yazıyoruz. bu datayı elde etmek istemiyorsak yazmamıza gerek yoktur.

import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function saveProductReducer(
  state = initialState.saveProduct,
  action
) {
  switch (action.type) {
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return action.payload;
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}