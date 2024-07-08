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
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}Items):
                $
                {cartItems
                  .reduce((a, c) => a + c.price * c.quantity, 0)
                  .toFixed(2)
                }
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid">
                <Link to={`/checkout`}>
                  <Button
                    type="button"
                    variant="primary"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div >
  )
};

CheckOut.propTypes = {
  cartItems: PropType.array,
};

export default CheckOut
