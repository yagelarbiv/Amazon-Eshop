import ListGroup from 'react-bootstrap/ListGroup'
import Title from '../shared/title'
import Rating from '../shared/Rating'
import PropTypes from 'prop-types';

const ProductDescription = ({ title, rating, price, description }) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <Title title={title}/>
        <h1 style={{ wordWrap: "break-word"}} src={description}>{title}</h1>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating rating={rating.rate} numReviews={rating.count} />
      </ListGroup.Item>
      <ListGroup.Item>Price: ${price}</ListGroup.Item>
      <ListGroup.Item>Description: <p className='lead'>{description}</p></ListGroup.Item>
    </ListGroup>
  )
};
export default ProductDescription;

ProductDescription.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.object,
  price: PropTypes.number,
  description: PropTypes.string
};

