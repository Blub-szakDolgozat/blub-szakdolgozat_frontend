import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';
import ProfileKep from '../components/ProfilKep';
import '../App.css';

function Buborekok() {
  const bubbles = Array.from({ length: 20 }, (_, index) => (
    <div key={index} className="bubble"></div>
  ));
  return <div className="bubbles">{bubbles}</div>;
}

function Halak() {
  return (
    <div>
      <div className="fish">
        <div className="fish-body">
          <div className="fish-eye"></div>
          <div className="fish-tail"></div>
        </div>
      </div>
      <div className="fish" style={{ animationDelay: '3s' }}>
        <div className="fish-body">
          <div className="fish-eye"></div>
          <div className="fish-tail"></div>
        </div>
      </div>
    </div>
  );
}
const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search Query:", searchQuery);
    // Itt hívhatod meg a keresési funkciót
  };

  const closeMenu = (e) => {
    // Csak akkor zárja be a menüt, ha a kattintás nem a menü vagy a hamburger ikon területén történt
    if (!e.target.closest('.dropdown-menu') && !e.target.closest('.hamburger')) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);
  const handleProfileClick = () => {
    alert('Profilképre kattintottál!');
  };
  return (
    <div className="App">
    <div className="ocean">
      <Buborekok />
      <Halak />
    </div>
    <header className="App-header">
      <h1>Blub</h1>
      <ProfileKep onClick={handleProfileClick} />
    </header>
    <div className="App-content">
    <div>
       <nav className="navbar">
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Keresés..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button">Keresés</button>
          </form>
        </div>
        </nav>
        {/* Hamburger ikon */}
      {/* Menü (legördülős) */}
      <nav className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/admin" className="nav-link">
          Admin
        </Link>
        <Link to="/bejelentkezes" className="nav-link">
          Bejelentkezés
        </Link>
        <Link to="/akvarium" className="nav-link">
          Akvárium
        </Link>
        <Link to="/sorsolas" className="nav-link">
          Napi Sorsolás
        </Link>
      </nav>
      

      {/* Tartalom */}
      <div className="content">
        <Outlet />
      </div>
      </div>
      </div>
    </div>
  );
};

export default Layout;
