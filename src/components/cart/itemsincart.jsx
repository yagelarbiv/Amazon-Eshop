import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { ADD_TO_CART } from "../../actions";
import PropType from 'prop-types';

const ItemsInCart = ({ cartItems, ctxDispatch }) => {


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
                      ctxDispatch({
                        type: ADD_TO_CART,
                        payload: { ...item, quantity: Number(e.target.value) },
                      })
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  {/* <Button
                    variant="light"
                    disabled={item.countInStock === 0}
                    onClick={() =>
                      removeProductHandler(item.token)
                    }
                  >
                    <i className="fa fa-trash"></i>
                  </Button> */}
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
  updateCartHandler: PropType.func,
  cartItems: PropType.array,
  ctxDispatch: PropType.func
};

export default ItemsInCart
