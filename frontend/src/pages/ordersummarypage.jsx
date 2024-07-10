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
import Card from "react-bootstrap/Card";
import axios from "axios";
import CartItemsList from "../components/orderSummaryPage/CartItemsList";
import OrderSummary from "../components/orderSummaryPage/ordersummary";


const OrderSummaryPage = () => {
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
        user: userInfo._id,
        name: userInfo.name,
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

          <CartItemsList cartItems={cartItems} />
        </Col>

        <Col md={4}>
          <OrderSummary cart={cart} submitOrderHandler={submitOrderHandler} loading={loading} />
        </Col>
      </Row>
    </div>
  )
}

export default OrderSummaryPage
