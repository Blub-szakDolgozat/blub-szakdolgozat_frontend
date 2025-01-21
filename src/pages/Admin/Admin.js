import { Link, Routes, Route } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import CikkekUrlap from '../../components/admin/CikkekUrlap';
import ViziLenyekUrlap from '../../components/admin/ViziLenyekUrlap';


export default function Admin() {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/vizilenyekurlap">Vízilények</Navbar.Brand>
        </Container>
        <Container>
          <Navbar.Brand as={Link} to="/cikkekurlap">Cikkek</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
// Itt navok-ban külön jelenitjük meg az admin-hoz szükséges űrlapokat, a kezdőoldala meg a felhasználók kezelése lenne. 
