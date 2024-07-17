import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Title from '../components/shared/title';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Store } from '../store';
import { FILLTER } from '../actions';

const FillterChoice = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fillterChoce } = state;
  const [fillterChoice, setFillterChoice] = useState(fillterChoce);
  
  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/');
  };

  useEffect(() => {
    ctxDispatch({ type: FILLTER, payload: fillterChoice });
  }, [fillterChoice, ctxDispatch]);
  return (
    <div>
    <Title title="Fillter Method" />

    <Container className="small-container">
      <h1 className="my-3">Fillter Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="client">
          <Form.Check
            type="radio"
            id="client"
            label="client"
            value="client"
            checked={fillterChoice === 'client'}
            onChange={(e) => setFillterChoice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="server">
          <Form.Check
            type="radio"
            id="server"
            label="server"
            value="server"
            checked={fillterChoice === 'server'}
            onChange={(e) => setFillterChoice(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button variant="primary" type="submit">Continue</Button>
        </div>
      </Form>
    </Container>
  </div>
  )
}

export default FillterChoice
