import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Title from "../components/shared/title";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Store } from "../store";
import { USER_SIGNIN } from "../actions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch: ctxDispatch } = useContext(Store);

const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("/api/v1/users/signin", { email, password });

    ctxDispatch({ type: USER_SIGNIN, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));

    navigate('/');
  } catch (error) {
    toast.error(getError(error));
  }
};

  return (
    <Container className="small-container">
      <Title title="Sign-In" />
      <h1 className="my-3">Sign-In</h1>
      <Form onSubmit={submitHandler}>
        
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">SignIn</Button>
        </div>

        <div className="mb-3">
          new Customer? <Link to={"/SignUp"} >Create Your Account</Link>
        </div>

        <div className="mb-3">
          Forgot Your Password? <Link to={"/forget-password"} >Reset Password</Link>
        </div>

      </Form>
    </Container>
  )
}

export default SignIn
