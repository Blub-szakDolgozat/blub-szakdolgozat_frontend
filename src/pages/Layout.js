import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import ProfileKep from "../components/ProfilKep";
import "./Ocean.css";

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
          <div className="fish-oldaluszo"></div>
        </div>
      </div>

      <div className="fish2" style={{ animationDelay: "4s" }}>
        <div className="fish-body2">
          <div className="fish-eye"></div>
          <div className="fish-tail2"></div>
          <div className="fish-oldaluszo2"></div>
        </div>
      </div>
      <div className="fish" style={{ animationDelay: "5s" }}>
        <div className="fish-body3">
          <div className="fish-eye"></div>
          <div className="fish-tail3"></div>
          <div className="fish-oldaluszo3"></div>
        </div>
      </div>
    </div>
  );
}
const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    if (
      !e.target.closest(".dropdown-menu") &&
      !e.target.closest(".hamburger")
    ) {
      setIsMenuOpen(false);
    }
  };
  const handleProfileClick = () => {
    alert("Profilképre kattintottál!");
  };
  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div className="App">
      <div className="ocean">
        <Buborekok />
        <Halak />
        <div className="plants"> 
            <div className="plant tall"></div> 
            <div className="plant short"></div> 
            <div className="plant wide"></div> 
            <div className="plant"></div> 
            <div className="plant tall wide"></div> 
            <div className="plant short"></div> 
            <div className="plant"></div> 
            <div className="plant wide"></div> 
            <div className="plant tall"></div> 
            <div className="plant short"></div>            
</div> 
      </div>
      <header className="App-header">
        <ProfileKep onClick={handleProfileClick} />
        <h1>Blub</h1>
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
                <button type="submit" className="search-button">
                  Keresés
                </button>
              </form>
            </div>
          </nav>
          {/* Hamburger ikon */}
          {/* Menü (legördülős) */}
          <nav className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
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
            <Link to="/videok" className="nav-link">
              Videók
            </Link>
            <Link to="/cikkek" className="nav-link">
              Cikkek
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
