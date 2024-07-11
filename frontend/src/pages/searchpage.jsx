/* eslint-disable react-refresh/only-export-components */
import { Fragment, useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getError, getFilterUrl } from "../utils";
import { toast } from "react-toastify";
import axios from "axios";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";
import searchPageReducer from "../reducers/searchPageReducer";
import Title from "../components/shared/title";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "../components/shared/Rating";
import Loading from "../components/shared/Loading";
import MessageBox from "../components/shared/MessageBox";
import Button from "react-bootstrap/Button";
import Product from "../components/HomePage/Product";
import { LinkContainer } from "react-router-bootstrap";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50"
  },
  {
    name: "$51 to $200",
    value: "51-200"
  },
  {
    name: "$201 to $1000",
    value: "201-1000"
  },
];

export const Rates = [
  {
    name: "4stars & up",
    rating: 4
  },
  {
    name: "3stars & up",
    rating: 3
  },
  {
    name: "2stars & up",
    rating: 2
  },
  {
    name: "1stars & up",
    rating: 1
  },
]

const SearchPage = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const category = searchParams.get('category') || 'all';
  const query = searchParams.get('query') || 'all';
  const price = searchParams.get('price') || 'all';
  const rating = searchParams.get('rating') || 'all';
  const order = searchParams.get('order') || 'newest';
  const page = searchParams.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(searchPageReducer, {
    loading: true,
    error: '',
    products: [],
    pages: 0,
    countProducts: 0
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`/api/v1/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    getCategories();
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get(`/api/v1/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`);
        console.log(data.products);
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: getError(error) });
      }
    };
    getData();
  }, [category, query, price, rating, order, page]);



  return (
    <div>
      <Title title="Search products" />
      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <div>
            <ul>
              <li>
                <Link className={'all' === category ? 'text-bold' : ''} to={getFilterUrl(search, { category: 'all' })}>Any</Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link className={c === category ? 'text-bold' : ''} to={getFilterUrl(search, { category: c })}>{c}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link className={'all' === price ? 'text-bold' : ''} to={getFilterUrl(search, { price: 'all' })}>Any</Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link className={p.value === price ? 'text-bold' : ''} to={getFilterUrl(search, { price: p.value })}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Reviews</h3>
            <ul>
              {Rates.map((r) => (
                <li key={r.name}>
                  <Link className={r.rating === rating ? 'text-bold' : ''} to={getFilterUrl(search, { rating: r.rating })}>
                    <Rating caption={' '} rating={r.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (<Loading />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : products ? (
            <Fragment>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' || category !== 'all' || price !== 'all' || rating !== 'all' ? (
                      <Button variant="light" onClick={() => navigate(getFilterUrl(search, {
                        category: 'all',
                        query: 'all',
                        rating: 'all',
                        price: 'all',
                        order: 'newest'
                      }))}> <i className="fas fa-times-circle"></i> </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl(search, { order: e.target.value }));
                    }}
                  >
                    <option value="lowest">Price: Low to High</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products?.length === 0 && <MessageBox>No Product Found</MessageBox>}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className='mx-1'
                    to={{
                      pathname: '/search', 
                      search: getFilterUrl(search, { page: x + 1 }, true)}}
                  >
                    <Button className={Number(page) === x + 1 ? 'highlight-current-page' : ''} 
                    variant='light'>
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </Fragment>
          ) : (
            <MessageBox>No Product Found</MessageBox>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default SearchPage
