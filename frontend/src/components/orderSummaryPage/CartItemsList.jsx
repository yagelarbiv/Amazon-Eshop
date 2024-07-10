
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CartItemsList = ({ cartItems }) => {
  return (
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
  );
};

CartItemsList.propTypes = {
  cartItems: PropTypes.array,
};

export default CartItemsList
