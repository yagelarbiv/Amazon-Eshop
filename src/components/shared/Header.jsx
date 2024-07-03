import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import NavDropDown from "react-bootstrap/NavDropdown";
import { Store } from "../../store.jsx";
import { useContext } from 'react';
import Badge from 'react-bootstrap/Badge';
import { USER_LOGOUT } from "../../actions.jsx";
const Header = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo, 
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();

  const logoutHandler = () => {
    ctxDispatch({ type: USER_LOGOUT },);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    navigate('/');
  };

  return (
    <header>
      <NavBar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <NavBar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={80}
                alt="Amazon logo" />
            </NavBar.Brand>
          </LinkContainer>
          {" "}
          {<SearchBox />}
          <nav className="d-flex align-items-center justify-content-end me-2 ms-4">
            <Link to="/cart" className="nav-link me-2 position-relative">
              <i className="fas fa-shopping-cart text-white"></i>
              {
                cartItems.length > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 translate-middle" text="light" >
                    {cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                )
              }
            </Link>
          </nav>
          {
            userInfo ? (
              <NavDropDown className="text-white" title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropDown.Item>User Profile</NavDropDown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropDown.Item>Order History</NavDropDown.Item>
                </LinkContainer>
                <NavDropDown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={logoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropDown>
            ) : (
              <NavDropDown className="text-white" title={"Enter"} id="basic-nav-dropdown">
                <LinkContainer to="/singin">
                  <NavDropDown.Item>
                    Sign In
                  </NavDropDown.Item>
                </LinkContainer>

                <NavDropDown.Divider />

                <LinkContainer to="/signup">
                  <NavDropDown.Item>
                    Sign Up
                  </NavDropDown.Item>
                </LinkContainer>
              </NavDropDown>
            )
          }
        </Container>
      </NavBar>
    </header>
  )
}

export default Header