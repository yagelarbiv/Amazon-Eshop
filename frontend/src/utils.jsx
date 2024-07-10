import axios from 'axios';
import { ADD_TO_CART } from './actions';
import { toast } from "react-toastify";

export const getError = (error) => {
  console.log(error);
  return (error.message && error.response?.data?.message ? error.response.data.message : error.message);
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

export const getFilterUrl = (searchFromURI, filter, skipPathname) => {
  const searchParams = new URLSearchParams(searchFromURI);

  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const order = searchParams.get('order') || 'newest';
  const page = searchParams.get('page') || 1;

  const filterPage = filter.page || page;
  const filterCategory = filter.category || category;
  const filterQuery = filter.query || query;
  const filterRating = filter.rating || rating;
  const filterPrice = filter.price || price;
  const filterOrder = filter.order || order;
  const link = `${skipPathname ? '' : '/search?'}?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`;
  return link;
}