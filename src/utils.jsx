
import axios from 'axios';
import { ADD_TO_CART } from './actions';

export const getError = (error) => {
  console.log(error);
  return (error.message && error.response.data.mesage ? error.response.data.mesage : error.message);
}

export const addToCart = async (product, cartItems, ctxDispatch) => {
  const existItem = cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  try {
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    if (data.countInStock < quantity) {
      throw new Error('Sorry. Product is out of stock');
    }
    ctxDispatch({
      type: ADD_TO_CART,
      payload: { ...product, quantity },
    });
  } catch (error) {
    throw new Error(getError(error));
  }
};