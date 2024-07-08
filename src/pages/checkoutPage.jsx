import Title from "../components/shared/title"
import ListGroup from "react-bootstrap/ListGroup";
import { useContext } from "react";
import { Store } from "../store";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";


const CheckoutPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart: { cartItems } } = state;
  const navigate = useNavigate();

  const CheckOut = () => {
    ctxDispatch({
      type: "CART_CLEAR",
    });
    localStorage.removeItem("cartItems");
    navigate("/");
  };
  return (
    <>
      <Title title="Checkout Page" />
      <Row>
        <Col md={6}>
        <ListGroup>
          <ListGroup.Item>
            <h1>{userInfo.name}`s Checkout</h1>
            <p>
              Total:{" "}({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
              items)
            </p>
            <p>
              Price:{" "}{Math.floor(cartItems.reduce((a, c) => a + c.price * c.quantity, 0))}$
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              variant="primary"
              disabled={cartItems.length === 0}
              onClick={CheckOut}
            >
              Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default CheckoutPage
