import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/app" className="nav-link">Home</Link>
            <Link to="/app/about" className="nav-link">About</Link>
            <Link to="/app/Foodgroup" className="nav-link">Foodgroup</Link>
            <Link to="/app/Qtymast" className="nav-link">Qtymast</Link>
            <Link to="/app/Menumast" className="nav-link">Menumast</Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Outlet />
      </Container>
    </>
  );
}

export default App;


