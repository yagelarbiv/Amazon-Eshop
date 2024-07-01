import { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Title from "../components/shared/title";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Store } from "../store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { USER_SIGNIN } from "../actions";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { state, dispatch: CtxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("hello");
      const { data } = await axios.post("/api/v1/users/signup", { name, email, password });

      CtxDispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));

      navigate('/');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Container className="small-container">
      <Title title="Sign-Up" />
      <h1 className="my-3">Sign-Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name: </Form.Label>
          <Form.Control type="text" required onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmpassword">
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <div className="mb-3">
          <Button type="submit" disabled={password !== confirmPassword}>SignIn</Button>
          {
            <div className="text-danger">{password !== confirmPassword && "Passwords Do Not Match"}</div>
          }
        </div>

        <div className="mb-3">
        Already Have An Account? {" "}<Link to={"/signIn"} >Sign in Here</Link>
        </div>
      </Form>
    </Container>
  )
}

export default SignUp
