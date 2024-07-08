import PropType from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from '../shared/Rating';
import { useContext } from 'react';
import { Store } from '../../store';
import { addToCart, getError } from '../../utils';
import { toast } from "react-toastify";

const Product = ({ product }) => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  const addToCartHandler = async (product, cartItems, ctxDispatch) => {
    try {
      await addToCart(product, cartItems, ctxDispatch);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Card className="product-card">
      <Link to={`/product/${product.token}`}>
        <Card.Img style={{ padding: "20px" }} variant="top" src={product.image} alt={product.title} />
      </Link>
      <Card.Body className="card-body">
        <Card.Title className="max-h-6">
          <Link to={`/product/${product.token}`}>
            {product.title}
          </Link>
        </Card.Title>
        <Rating rating={product.rating.rate} numReviews={product.rating.count} />
        <Card.Text>
          {product.price}$
        </Card.Text>
        {
          product.countInStock > 0
            ? <Button className="btn-primary" onClick={() => addToCartHandler(product, cartItems, ctxDispatch)}>Add to cart</Button>
            : <Button variant="light" disabled >Out Of Stock</Button>
        }
      </Card.Body>
    </Card>
  )
};

Product.propTypes = {
  product: PropType.object
}

export default Product
