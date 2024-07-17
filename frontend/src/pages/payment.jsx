import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Title from '../components/shared/title';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Store } from '../store';
import CheckoutSteps from '../components/shared/checkoutsteps';
import { SAVE_PAYMENT_METHOD } from '../actions';

const Payment = () => {
  const navigate = useNavigate();
  const { state: { userInfo, cart: {
    shippingAddress,
    paymentMethod,
    cartItems
  } }, dispatch: ctxDispatch } = useContext(Store);

  const [payment, setPayment] = useState(paymentMethod || '');

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: SAVE_PAYMENT_METHOD,
      payload: payment
    });
    navigate('/placeorder');
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
    if (!userInfo) {
      navigate('/signin?redirect=/payment');
    }
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [userInfo, navigate, cartItems, shippingAddress]);

  return (
    <div>
      <Title title="Payment Method" />
      <CheckoutSteps step1 step2 step3 />

      <Container className="small-container">
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="Stripe">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={payment === 'Stripe'}
              onChange={(e) => setPayment(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="PayPal">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={payment === 'PayPal'}
              onChange={(e) => setPayment(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">Continue</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Payment
