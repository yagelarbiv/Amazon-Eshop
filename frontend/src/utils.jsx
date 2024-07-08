import axios from 'axios';
import { ADD_TO_CART } from './actions';
import { toast } from "react-toastify";

export const getError = (error) => {
  console.log(error);
  return (error.message && error.response.data.message ? error.response.data.message : error.message);
}

export const addToCart = async (product, cartItems, ctxDispatch) => {
  const existItem = cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  try {
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of stock');
      throw new Error('Sorry. Product is out of stock');
    }
    ctxDispatch({
      type: ADD_TO_CART,
      payload: { ...product, quantity },
    });
  } catch (error) {
    toast.error(error);
    throw new Error(error);
  }
};