import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import NavDropDown from "react-bootstrap/NavDropdown";
import { Store } from "../../store.jsx";
import { useContext } from 'react';
import { Badge } from "react-bootstrap/Badge";
const Header = () => {
  console.log(useContext(Store));
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo
  } = state;
  const navigate = useNavigate();

  const logoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
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
            {/* <input type="text" className="form-control h-40" placeholder="Search" aria-label="Search" rows="1"></input> */}
            <Link to="/cart" className="nav-link me-2">
              <i className="fas fa-shopping-cart text-white"></i>
              <Badge bg="danger">{userInfo?.cart?.length}</Badge>
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
                  onClick={() => logoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropDown>
            ) : (
              <>
                <Link className="nav-link text-white me-2" to="/singin">Sign In</Link>
                <Link className="nav-link text-white" to="/signup">Sign Up</Link>
              </>
            )
          }
        </Container>
      </NavBar>
    </header>
  )
}

export default Header