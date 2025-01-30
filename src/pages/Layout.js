import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import ProfileKep from "../components/ProfilKep";
import "./Ocean.css";
import { Nav } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

// Buborékok animáció
function Buborekok() {
  const bubbles = Array.from({ length: 20 }, (_, index) => (
    <div key={index} className="bubble"></div>
  ));
  return <div className="bubbles">{bubbles}</div>;
}

// Halak animáció
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
    const { user } = useAuth(); // Felhasználói adat lekérése, jogosultságok ellenőrzése
    const [searchQuery, setSearchQuery] = useState("");
  

  // Keresés változás kezelése
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Keresés submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search Query:", searchQuery);
  };

  // Profilkép kattintás kezelése
  const handleProfileClick = () => {
    alert("Profilképre kattintottál!");
  };

  

  return (
    <div className="App">
      <div className="ocean">
        <Buborekok />
        <Halak />
        {/* Növények az akváriumban */}
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
            <div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>

            {/* Keresés */}
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

          {/* Menü (legördülős) */}
          <Nav style={{ display: "flex", gap: "0" }}>
  {/* Admin fül csak akkor jelenjen meg, ha a felhasználó admin */}
  {user?.jogosultsagi_szint === "admin" && (
    <Nav.Item>
      <Link
        to="/admin"
        className="nav-link"
        style={{
          fontWeight: "bold",
          textDecoration: "none",
        }}
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        Admin
      </Link>
    </Nav.Item>
  )}
  {/* Egyéb menüpontok */}
  <Nav.Item>
    <Link
      to="/bejelentkezes"
      className="nav-link"
      style={{
        fontWeight: "bold",
        textDecoration: "none",
      }}
      onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
      onMouseOut={(e) => (e.target.style.textDecoration = "none")}
    >
      Bejelentkezés
    </Link>
  </Nav.Item>
  <Nav.Item>
    <Link
      to="/akvarium"
      className="nav-link"
      style={{
        fontWeight: "bold",
        textDecoration: "none",
      }}
      onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
      onMouseOut={(e) => (e.target.style.textDecoration = "none")}
    >
      Akvárium
    </Link>
  </Nav.Item>
  <Nav.Item>
    <Link
      to="/sorsolas"
      className="nav-link"
      style={{
        fontWeight: "bold",
        textDecoration: "none",
      }}
      onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
      onMouseOut={(e) => (e.target.style.textDecoration = "none")}
    >
      Napi Sorsolás
    </Link>
  </Nav.Item>
  <Nav.Item>
    <Link
      to="/videok"
      className="nav-link"
      style={{
        fontWeight: "bold",
        textDecoration: "none",
      }}
      onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
      onMouseOut={(e) => (e.target.style.textDecoration = "none")}
    >
      Videók
    </Link>
  </Nav.Item>
  <Nav.Item>
    <Link
      to="/cikkek"
      className="nav-link"
      style={{
        fontWeight: "bold",
        textDecoration: "none",
      }}
      onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
      onMouseOut={(e) => (e.target.style.textDecoration = "none")}
    >
      Cikkek
    </Link>
  </Nav.Item>
  <Nav.Item>
    <Link
      to="/esemenyek"
      className="nav-link"
      style={{
        fontWeight: "bold",
        textDecoration: "none",
      }}
      onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
      onMouseOut={(e) => (e.target.style.textDecoration = "none")}
    >
      Események
    </Link>
  </Nav.Item>
</Nav>


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
