import React from 'react';
import { Nav } from 'react-bootstrap'; 
import { Link, Outlet } from 'react-router-dom';  
import './Layout.css'; 

const Layout = () => {
  return (
    <div>
      <Nav className="navbar custom-navbar">
        <Link to="/admin" className="nav-link-black">
          Admin
        </Link>
        <Link to="/bejelentkezes" className="nav-link-black">
          Bejelentkezés
        </Link>
        <Link to="/akvarium" className="nav-link-black">
          Akvárium
        </Link>
      </Nav>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
