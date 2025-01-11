import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Bejelentkezes from "./Bejelentkezes";
import Regisztralas from "./Regisztralas";

export default function Public() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Bejelentkezési állapot frissítése
  const handleLogin = () => {
    setIsLoggedIn(true);  // Frissíti az isLoggedIn állapotot
    navigate("/");        // Navigálás a főoldalra
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {/* Főoldal tartalom */}
          <h1>Üdvözöllek a főoldalon!</h1>
          <p>Ez a tartalom csak bejelentkezés után érhető el.</p>
        </div>
      ) : (
        <Routes>
          {/* Bejelentkezés és regisztráció */}
          <Route path="/bejelentkezes" element={<Bejelentkezes onLogin={handleLogin} />} />
          <Route path="/regisztralas" element={<Regisztralas />} />
          <Route path="*" element={<Bejelentkezes onLogin={handleLogin} />} />
        </Routes>
      )}
    </div>
  );
}
