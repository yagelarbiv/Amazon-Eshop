import { useContext, useEffect, useState } from "react"
import { Store } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CLEAR_CART } from "../actions";
import { getError } from "../utils";
import Title from "../components/shared/title";
import CheckoutSteps from '../components/shared/checkoutsteps';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Loading from "../components/shared/Loading";
import axios from "axios";


const OrderPage = () => {
  const [loading, setLoading] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart, } = state
  const { paymentMethod, cartItems, shippingAddress } = cart;
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems.length) {
      toast.error('Cart is empty');
      navigate('/');
    }
    if (!userInfo) {
      toast.error('Signin required');
      navigate('/signin?redirect=/placeorder');
    }
    if (!shippingAddress) {
      toast.error('Shipping address required');
      navigate('/shipping');
    }
    if (!paymentMethod) {
      toast.error('Payment method required');
      navigate('/payment');
    }
  }, [userInfo, navigate, paymentMethod, cartItems.length, shippingAddress]);

  const submitOrderHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post('/api/v1/orders', {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      ctxDispatch({ type: CLEAR_CART, });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      toast.error(getError(error));
    }
    finally {
      setLoading(false);
    }
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.taxPrice = round2(cart.itemsPrice * 0.15);
  cart.shippingPrice = cart.itemsPrice > 50 ? round2(cart.itemsPrice * 0.1) : round2(cart.itemsPrice * 0.02);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;

  return (
    <div>
      <Title title="Place Order" />
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="my-3">Order Summary</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {shippingAddress.fullName} <br />
                <strong>Address: </strong> {shippingAddress.address}, <br />
                <strong>Postal-Code:</strong> {shippingAddress.postalCode}, <br />
                <strong>City: </strong> {shippingAddress.city}, <br />
                <strong>Country: </strong> {shippingAddress.country}, <br />
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <Link to="/cart" className="mb-3 ">Edit</Link>
              <ListGroup variant="flush">
                <Row className="align-items-center mb-3">
                  <Col md={6}>
                    Description
                  </Col>
                  <Col md={3}>
                    Quantity
                  </Col>
                  <Col md={3}>
                    Price ($)
                  </Col>
                </Row>
                {
                  cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6} className="image-container">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="img-fluid rounded img-thumbnail mb-2"
                          />{' '}
                          <div>
                            <Link to={`/product/${item.token}`} className="btn btn-light">{item.title}</Link>
                          </div>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>
                          {item.quantity} x ${item.price} = ${item.price * item.quantity}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Order Total: </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={submitOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                  {loading && <Loading />}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderPage
