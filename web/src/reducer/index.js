import { combineReducers } from "redux";
import patient, * as fromPatient from "./patientReducer";
//import order from "./order";

export default combineReducers({
  patient,
  //order
});

//const getCartItemFunc = (state) => fromCart.getCartItem(state.cart);
//const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
/*const getProductFunc = (state, id) =>
  fromProducts.getProduct(state.products, id);
*/
/*export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)
*/
/*export const getCartItem = (state) =>
  getCartItemFunc(state).map((id) => ({
    ...getProduct(state, id)
    //quantity: getQuantity(state, id)
  }));*/
