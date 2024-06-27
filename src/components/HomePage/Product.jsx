import PropType from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from '../shared/Rating';
// import Rating from 'react-rating';

const Product = ({ product }) => {
  return (
    <Card className="product-card">
      <Link to={`./products/${product.token}`}>
        <Card.Img style={{ padding: "20px" }} variant="top" src={product.image} alt={product.title} />
      </Link>
      <Card.Body className="card-body">
        <Link to={`./products/${product.token}`}>
          <Card.Title style={{ maxHeight: '50px', overflow: 'hidden' }}>
            {product.title}
          </Card.Title>
        </Link>
        {/* <div className="rating">
          <Rating start={0} stop={5} readonly initialRating={product.rating.rate} emptySymbol="far fa-star" fullSymbol="fas fa-star" />
          <span>{` ${product.rating.count} reviews`}</span>
        </div> */}
        <Rating rating={product.rating.rate} numReviews={product.rating.count} />
        <Card.Text>
          {product.price}$
        </Card.Text>
        {
          product.countInStock > 0
            ? <Button className="btn-primary" >Add to cart</Button>
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
