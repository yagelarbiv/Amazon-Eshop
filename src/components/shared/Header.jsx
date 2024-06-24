import NavBar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
export const Header = () => {
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
            {/* <SearchBox /> */}
            <nav className='d-flex align-items-center '>
              
            </nav>
          </Container>
        </NavBar>
    </header>
  )
}
