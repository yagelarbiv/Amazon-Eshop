import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import PropType from 'prop-types';

const ItemsInCart = ({ cartItems, removeProductHandler, updateCartHandler }) => {


  return (
    <div>
      <ListGroup>
        {
          cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row className="align-items-center">
                <Col md={3}>
                  <img
                    src={item.image}
                    className="img-fluid rounded img-thumbnail"
                    alt={item.name}
                  />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.token}`}>{item.title}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock > 10 ? 10 : item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    variant="light"
                    onClick={() =>
                      removeProductHandler(item)
                    }
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </div>
  )
};

ItemsInCart.propTypes = {
  cartItems: PropType.array,
  updateCartHandler: PropType.func,
  removeProductHandler: PropType.func,
};

export default ItemsInCart
