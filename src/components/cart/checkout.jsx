import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import PropType from 'prop-types';

const CheckOut = ({ cartItems }) => {
  return (
    <div>
      <Card>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      <h3>
                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                        items) : $
                        {Math.floor(cartItems.reduce((a, c) => a + c.price * c.quantity, 0), 2)}
                      </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-grid"></div>
                      <Button
                        type="button"
                        variant="primary"
                        disabled={cartItems.length === 0}
                      >
                        Checkout
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
    </div>
  )
};

CheckOut.propTypes = {
  cartItems: PropType.array,
};

export default CheckOut
