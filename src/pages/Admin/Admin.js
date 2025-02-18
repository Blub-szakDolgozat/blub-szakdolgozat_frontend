import { NavLink, Outlet } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import './Admin.css';

export default function Admin() {
  return (
    <Container>
      <Nav style={{ display: "flex", gap: "0" }}>
        <Nav.Item>
          <NavLink
            to="/admin/vizilenyekurlap"
            className="nav-link"
          >
            Vízilények
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/admin/cikkekurlap"
            className="nav-link"
          >
            Cikkek
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/admin/esemenyekurlap"
            className="nav-link"
          >
            Események
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/admin/videokurlap"
            className="nav-link"
          >
            Videók
          </NavLink>
        </Nav.Item>
      </Nav>
      <div className="content">
        <Outlet />
      </div>
    </Container>
  );
}
