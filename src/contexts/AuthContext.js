import { createContext, useState } from "react";

import { useNavigate } from "react-router";
import { myAxios } from "./MyAxios";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login állapot

  // CSRF cookie megszerzése
  const csrf = async () => {
    await myAxios.get("/sanctum/csrf-cookie"); // Lekéri a CSRF cookie-t
  };

  // Regisztráció
  const regisztracio = async ({ ...adat }) => {
    await csrf(); // CSRF token beállítása
    try {
      await myAxios.post("/register", adat);
      getUser();
      navigate("/bejelentkezes"); // Bejelentkezéshez vezet
    } catch (error) {
      console.log(
        "Regisztrációs hiba:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Bejelentkezés
  const login = async ({ email, password }) => {
    await csrf(); // CSRF token beállítása
    try {
      // Bejelentkezési kérés küldése
      const { data } = await myAxios.post("/login", { email, password });
      // Ha sikeres, beállítjuk a felhasználói adatokat és a tokent
      setUser(data.user);
      setIsLoggedIn(true);
      localStorage.setItem("access_token", data.access_token); // Mentse el a token-t (pl. localStorage-ba)
      navigate("/akvarium"); // Átirányítás a főoldalra vagy más oldalra
    } catch (error) {
      console.log(
        "Bejelentkezési hiba:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Felhasználó adatainak lekérése
  const getUser = async () => {
    try {
      const { data } = await myAxios.get("/user");
      setUser(data);
    } catch (error) {
      console.log(
        "Felhasználó lekérdezési hiba:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Kijelentkezés
  const logout = async () => {
    await csrf(); // CSRF token beállítása
    try {
      await myAxios.post("/logout");
      setUser(""); // Töröljük a felhasználó adatokat
      setIsLoggedIn(false);
      localStorage.removeItem("access_token"); // Töröljük a tárolt tokent
      navigate("/bejelentkezes"); // Bejelentkezéshez vezet
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, regisztracio, login, user, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
