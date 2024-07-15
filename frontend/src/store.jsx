import { createContext, useReducer } from 'react';
import PropType from 'prop-types';
import storeReducer from './reducers/storeReducer';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

    products: localStorage.getItem('products')
      ? JSON.parse(localStorage.getItem('products'))
      : [],

  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
      
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},

    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod'))
      : '',
  },
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const body = {state, dispatch};
  return (
    <Store.Provider value={body}>{ children }</Store.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropType.node
};