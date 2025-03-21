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
  const { user, login, logout } = useAuth(); // 🔹 Auth context használata
  const [showLogin, setShowLogin] = useState(false);

  // Bejelentkezési művelet
  const handleLogin = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!email || !password) {
      console.log("Email vagy jelszó hiányzik!");
      return;
    }
    console.log("Küldendő adatok:", { email, password });
    await login({ email, password });
    setShowLogin(false);
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
        
      </div>

      <header className="App-header">
        <ProfileKep onClick={handleProfileClick} />
        <h1>Blub</h1>
      </header>
      <div className="Fej-content row">
        <Nav className="col-6">
        {user?.jogosultsagi_szint === "admin" && (
            <Nav.Item>
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </Nav.Item>
          )}
        {(user?.jogosultsagi_szint === "felhasznalo" || user?.jogosultsagi_szint === "admin") && (
        <Nav.Item>
          <Link to="/akvarium" className="nav-link">
            Akvárium
          </Link>
        </Nav.Item>
          )}
        {(user?.jogosultsagi_szint === "felhasznalo" || user?.jogosultsagi_szint === "admin") && (
          <Nav.Item>
            <Link to="/sorsolas" className="nav-link">
             Napi Sorsolás
            </Link>
          </Nav.Item>
        )}
          <Nav.Item>
            <Link to="/videok" className="nav-link">
              Videók
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/cikkek" className="nav-link">
              Cikkek
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/esemenyek" className="nav-link">
              Események
            </Link>
          </Nav.Item>
           
          </Nav>
 <nav className="jobb col-6">{/* Admin fül csak akkor jelenjen meg, ha a felhasználó admin */}
          {user ? (
            <>
              <Nav.Item>
                <Link to="#" className="gomb" onClick={logout}>
                  Kijelentkezés
                </Link>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <Link to="/bejelentkezes" className="gomb" onClick={() => setShowLogin(true)}>
                Bejelentkezés
              </Link>
            </Nav.Item>
          )}

        
</nav>
      </div>

      <div className="App-content">
        <div>
          
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
