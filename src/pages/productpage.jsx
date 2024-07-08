import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from '../components/shared/Loading';
import MessageBox from '../components/shared/MessageBox';
import CartDescription from './../components/productpage/cartdescription';
import ProductDescription from "../components/productpage/ProductDescription";
import productPageReducer from "../reducers/productPageReducer";
import { Store } from "../store";
import { addToCart, getError } from '../utils';
import axios from 'axios';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../actions';


const initialState = {
  loading: true,
  error: "",
  product: {},
}

const ProductPage = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;
  const [{ loading, error, product }, dispatch] = useReducer(productPageReducer, initialState);

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const res = await axios.get(`/api/v1/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: err.message });
        toast.error(getError(err));
      }
    }
    getProduct();
  }, [token]);

  const addToCartHandler = async () => {
    try {
      await addToCart(product, cartItems, ctxDispatch);
      navigate('/cart');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div>
      {
        loading ? (<Loading />) :
          error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
            <>
              <Row>
                <Col md={6}>
                  <ProductDescription {...product} />
                </Col>

                <Col md={6}>
                  <Row md={1} className="mb-3" >
                    <div style={{ width: "80%" }} className="border p-3">
                      <img width={400} src={product.image} alt={product.name} />
                    </div>
                  </Row>
                  
                  <Row md={2}>
                    <CartDescription product={product} addToCartHandler={addToCartHandler} />
                  </Row>
                </Col>
              </Row>
            </>
            )
      }
    </div>
  )
}

export default ProductPage
