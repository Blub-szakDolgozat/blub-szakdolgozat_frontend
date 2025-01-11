import React from 'react';
import { Nav } from 'react-bootstrap'; 
import { Link, Outlet } from 'react-router-dom';  

const Layout = () => {
  return (
    <div>
      {}
      <Nav className="navbar">
        <Nav.Item>
          <Link to="/*" className="nav-link-black">
            Public
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/admin" className="nav-link-black">
            Admin
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/bejelentkezes" className="nav-link-black">
            Bejelentkezes
          </Link>
        </Nav.Item>
      </Nav>

      {}
      <div className="content">
        <Outlet />  {}
      </div>
    </div>
  );
};

export default Layout;
