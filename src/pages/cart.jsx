import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../store";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Title from '../components/shared/title';
import ItemsInCart from "../components/cart/itemsincart";
import MessageBox from '../components/shared/MessageBox';
import CheckOut from "../components/cart/checkout";

const Cart = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart: { cartItems } } = state;

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
          <h1>{userInfo ? userInfo.name : 'Guest' }`s Shopping Cart</h1>
          <Row>
            <Col md={9}>
              <ItemsInCart cartItems={cartItems} ctxDispatch={ctxDispatch} />
            </Col>
            <Col md={3}>
              <CheckOut cartItems={cartItems} />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default Cart;