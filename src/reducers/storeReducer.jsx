import { ADD_TO_CART, USER_SIGNIN } from "../actions";
import PropType from 'prop-types';

const storeReducer = (state, { type, payload }) => {

  switch (type) {
    case USER_SIGNIN:
      return {
        ...state,
        userInfo: payload
      }
    case ADD_TO_CART: {
      const newItem = payload;
      const existingItem = state.cart.cartItems.find((item) => item._id === newItem._id);
      const cartItems = existingItem ?
        state.cart.cartItems.map((item) => item.name === existingItem._id ? (newItem) : (item)) : 
        ([...state.cart.cartItems, newItem]);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems
        }
      }
    }
    default:
      return state
  }
};
export default storeReducer;

storeReducer.propTypes = {
  type: PropType.string,
  payload: PropType.object
};
