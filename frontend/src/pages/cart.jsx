import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Title from '../components/shared/title';
import ItemsInCart from "../components/cart/itemsincart";
import MessageBox from '../components/shared/MessageBox';
import CheckOut from "../components/cart/checkout";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions";

const Cart = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart: { cartItems } } = state;
  const navigate = useNavigate();
  
  const removeProductHandler = (item) => {
    ctxDispatch({
      type: REMOVE_FROM_CART,
      payload: item
    });
  };
  const updateCartHandler = (item, quantity) => {
    ctxDispatch({
      type: ADD_TO_CART,
      payload: { ...item, quantity }
    });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <>
      <Title title="Shopping Cart" />
      {(cartItems.length === 0) ? (
        <MessageBox>
          Cart is empty.{""}
          <Link to="/">Go Back To Home Page</Link>
        </MessageBox>
      ) : (
        <div>
          <h1>{userInfo ? userInfo.name : 'Guest'}`s Shopping Cart</h1>
          <Row>
            <Col md={8}>
              <ItemsInCart 
              cartItems={cartItems} 
              removeProductHandler={removeProductHandler} 
              updateCartHandler={updateCartHandler} />
            </Col>
            <Col md={4}>
              <CheckOut cartItems={cartItems} checkoutHandler={checkoutHandler} />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default Cart;