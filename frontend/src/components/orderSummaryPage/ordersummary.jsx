import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import Loading from "../shared/Loading";
import Button from "react-bootstrap/Button";

const OrderSummary = ({ cart, submitOrderHandler, loading }) => {
  return (
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
          {
            submitOrderHandler && (
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
            )
          }
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

OrderSummary.propTypes = {
  cart: PropTypes.object,
  submitOrderHandler: PropTypes.func,
  loading: PropTypes.bool,
};

export default OrderSummary
