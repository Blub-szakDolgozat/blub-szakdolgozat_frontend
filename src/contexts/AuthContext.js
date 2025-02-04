import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { myAxios } from "./MyAxios";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("access_token"));

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
      const response = await myAxios.post("/login", {
        email: email,
        password: password,
      });
      setUser(response.data.user);
      setToken(response.data.access_token);
      localStorage.setItem("access_token", response.data.token);
      getUser();
      const storedProfilePic = localStorage.getItem("userProfilePic");
      setUserProfilePic(
        storedProfilePic || "https://www.w3schools.com/howto/img_avatar.png"
      );
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
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const response = await myAxios.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Felhasználói adat:", response.data);
        setUser(response.data);
        const storedProfilePic = localStorage.getItem("userProfilePic");
        setUserProfilePic(
          storedProfilePic || "https://www.w3schools.com/howto/img_avatar.png"
        );
      } catch (error) {
        console.log(
          "Felhasználó lekérdezési hiba:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  // Kijelentkezés
  const logout = async () => {
    await csrf();
    try {
      await myAxios.post("/logout");
      setUser(null);
      setIsLoggedIn(false);
      setUserProfilePic(null); // Profilkép alaphelyzetbe állítása
      localStorage.removeItem("userProfilePic");
      localStorage.removeItem("access_token");
      navigate("/bejelentkezes");
    } catch (error) {
      console.log(error);
    }
  };

  // Profilkép frissítése
  const updateProfilePic = (newProfilePic) => {
    setUserProfilePic(newProfilePic);
    localStorage.setItem("userProfilePic", newProfilePic);
  };

  // Fájl feltöltése és base64-re konvertálás
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Base64 kép
        updateProfilePic(base64Image); // Frissítés
      };
      reader.readAsDataURL(file);
    }
  };

  // Profilkép betöltése az alkalmazás indításakor
  useEffect(() => {
    getUser();
    const storedProfilePic = localStorage.getItem("userProfilePic");
    if (storedProfilePic) {
      setUserProfilePic(storedProfilePic);
    } else {
      setUserProfilePic("https://www.w3schools.com/howto/img_avatar.png"); // Alapértelmezett profilkép
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/user"); // A backend automatikusan ellenőrzi a CSRF cookie-t
        if (!response.ok) {
          throw new Error("Felhasználói adatok lekérése nem sikerült");
        }
        const data = await response.json();
        setUser(data); // A válasz tartalma (felhasználói adatok)
      } catch (error) {
        console.error("Hiba:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getUser,
        isLoggedIn,
        regisztracio,
        login,
        user,
        logout,
        userProfilePic,
        updateProfilePic,
        handleFileUpload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
