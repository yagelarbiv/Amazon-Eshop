import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

const CheckOut = ({ cartItems }) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <h3>
                <p>
                  Subtotal
                </p>
                <p>
                  ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items):{' '}
                  {Math.floor(cartItems.reduce((a, c) => a + c.price * c.quantity, 0), 2)}$
                </p>
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={`/checkout`}>
                <Button
                  type="button"
                  variant="primary"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </Link>
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
