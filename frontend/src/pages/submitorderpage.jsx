import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderPageReducer from "../reducers/orderPageReducer";
import Title from "../components/shared/title";
import Loading from "../components/shared/Loading";
import MessageBox from "../components/shared/MessageBox";
import { Store } from "../store";
import axios from "axios";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";
import { getError } from "../utils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import OrderItemsList from "../components/submoitorderpage/orderitemslist";


const OrderPage = () => {
  const { state: { userInfo } } = useContext(Store);
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ loading, error, order }, dispatch] = useReducer(orderPageReducer, {
    loading: false,
    error: "",
    order: {},
  });

  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get(`/api/v1/orders/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        console.log('Order data:', data);
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (err) {
        console.log('Fetch order error:', err);
        dispatch({ type: GET_FAIL, payload: getError(err) });
      }
    };
  
    if (!userInfo) {
      navigate('/signin?redirect=/orderpage');
      return;
    }
  
    if (!order || (order._id && id !== order._id) || Object.keys(order).length === 0) {
      fetchOrder();
    }
  }, [navigate, id, userInfo, order]);


  return (
    <div>
      {
        loading ? (<Loading />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : Object.keys(order).length !== 0 ? (
          <div>
            <Title title="OrderPage" />
            <h1 className="my-3">Order: {order._id}</h1>
            <Row>
              <Col md={8}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                      <strong>Address: </strong> {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      ,{" "}{order.shippingAddress.country}
                    </Card.Text>
                    {order.isDelivered ? (
                      <MessageBox variant="success">
                        Delivered at {order.deliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Delivered</MessageBox>
                    )}
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                      <strong>Method:</strong> {order.paymentMethod}
                    </Card.Text>
                    {order.isPaid ? (
                      <MessageBox variant="success">
                        Paid at {order.paidAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Paid</MessageBox>
                    )}
                  </Card.Body>
                </Card>

                <OrderItemsList order={order} />
              </Col>

              <Col md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Order Summary</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Items</Col>
                          <Col>${order.itemsPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Shipping</Col>
                          <Col>${order.shippingPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Tax</Col>
                          <Col>${order.taxPrice.toFixed(2)}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <strong> Order Total</strong>
                          </Col>
                          <Col>
                            <strong>${order.totalPrice.toFixed(2)}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
        <>
          <MessageBox variant="danger">Order Not Found</MessageBox>
        </>
        )
      }
    </div >
  )
}

export default OrderPage
