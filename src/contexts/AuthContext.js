import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { myAxios } from "./MyAxios";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  // CSRF cookie megszerzése
  const csrf = async () => {
    await myAxios.get("/sanctum/csrf-cookie");
  };

  // Regisztráció
  const regisztracio = async ({ ...adat }) => {
    await csrf();
    try {
      await myAxios.post("/register", adat);
      getUser();
      navigate("/bejelentkezes");
    } catch (error) {
      console.log(
        "Regisztrációs hiba:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Bejelentkezés
  const login = async ({ email, password }) => {
    await csrf();
    try {
      const { data } = await myAxios.post("/login", { email, password });
      setUser(data.user);
      setIsLoggedIn(true);
      setUserProfilePic(data.user.profilePic || null); // Profilkép inicializálása, ha elérhető
      localStorage.setItem("access_token", data.access_token);
      navigate("/akvarium");
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
      setUserProfilePic(data.profilePic || "https://www.w3schools.com/howto/img_avatar.png"); // Profilkép beállítása
    } catch (error) {
      console.log(
        "Felhasználó lekérdezési hiba:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Kijelentkezés
  const logout = async () => {
    await csrf();
    try {
      await myAxios.post("/logout");
      setUser("");
      setIsLoggedIn(false);
      setUserProfilePic(null); // Profilkép alaphelyzetbe állítása
      localStorage.removeItem("access_token");
      navigate("/bejelentkezes");
    } catch (error) {
      console.log(error);
    }
  };

  // Profilkép frissítése
  const updateProfilePic = (newProfilePic) => {
    setUserProfilePic(newProfilePic);

  };

  useEffect(() => {
    // Itt töltheted be a felhasználói adatokat, például API hívásból
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Példa API hívás
        const data = await response.json();
        setUser(data.user);
        setUserProfilePic(data.profilePic || 'https://www.w3schools.com/howto/img_avatar.png'); // Ha nincs profilkép, akkor az alapértelmezett képet használjuk
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        regisztracio,
        login,
        user,
        logout,
        userProfilePic,
        updateProfilePic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
