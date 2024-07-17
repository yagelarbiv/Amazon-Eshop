import axios from "axios";
import { ADD_TO_CART } from "./actions";
import { toast } from "react-toastify";

export const getError = (error) => {
  return error.message && error.response?.data?.message
    ? error.response.data.message
    : error.message;
};

export const addToCart = async (product, cartItems, ctxDispatch) => {
  const existItem = cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  try {
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      throw new Error("Sorry. Product is out of stock");
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

  const { category, query, price, rating, order, page } =
    splitFilter(searchParams);

  const filterPage = filter.page || page;
  const filterCategory = filter.category || category;
  const filterQuery = filter.query || query;
  const filterRating = filter.rating || rating;
  const filterPrice = filter.price || price;
  const filterOrder = filter.order || order;
  const link = `${
    skipPathname ? "" : "/search?"
  }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`;

  return link;
};

export const splitFilter = (searchParams) => {
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  return { category, query, price, rating, order, page };
};

export const fillterProducts = (products, filter) => {
  console.log(filter);
  const pageSize = 10;
  const { category, query, price, rating, order, page } = filter;
  if (category !== "all") {
    products = products.filter((x) => x.category === category);
  }
  if (query !== "all") {
    products = products.filter((x) => x.name.toLowerCase().includes(query));
  }
  if (rating !== "all") {
    products = products.filter((x) => x.rating === Number(rating));
  }
  switch (price) {
    case "1-50":
      products = products.filter((x) => x.price > 0 && x.price <= 50);
      break;
    case "51-200":
      products = products.filter((x) => x.price > 50 && x.price <= 200);
      break;
    case "201-1000":
      products = products.filter((x) => x.price > 200 && x.price <= 1000);
      break;
    default:
      break;
  }
  switch (order) {
    case "lowest":
      products = products.sort((a, b) => a.price - b.price);
      break;
    case "newest":
      products = products.sort((a, b) => b.createdAt - a.createdAt);
      break;
      case "toprated":
        products = products.sort((a, b) => b.rating - a.rating);
        break;
      case "highest":
        products = products.sort((a, b) => b.price - a.price);
        break;
    default:
      break;
  }

  const countProducts = products.slice((page - 1) * pageSize, page * pageSize);
  const pages = Math.ceil(products.length / pageSize);
  console.log(products);
  console.log(countProducts)

  return {products, countProducts, pages, page};
};
