
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';


const CartDescription = ({product, addToCartHandler}) => {
  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>${product.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>
                {
                  product.countInStock > 0 ? 
                  <Badge bg="success">In Stock</Badge> : 
                  <Badge bg="danger">Unavailable</Badge> 
                }{' '}
              </Col>
            </Row>
          </ListGroup.Item>
          {
            product.countInStock > 0 && (
              <ListGroup.Item>
                <div className="d-grid">
                  <Button onClick={() => addToCartHandler()} variant="primary">
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
            )
          }
        </ListGroup>
      </Card.Body>
    </Card>
  )
};
export default CartDescription

CartDescription.propTypes = {
  product: PropTypes.object,
  addToCartHandler: PropTypes.func
};