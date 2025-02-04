import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { myAxios } from "./MyAxios";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [userProfilePic, setUserProfilePic] = useState(localStorage.getItem("userProfilePic") || "https://www.w3schools.com/howto/img_avatar.png");
  

  // CSRF cookie megszerzése
  const csrf = async () => {
    await myAxios.get("/sanctum/csrf-cookie");
  };

  // Regisztráció
  const regisztracio = async ({ ...adat }) => {
    await csrf();
    try {
      await myAxios.post("api/register", adat);
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
      const response = await myAxios.post("api/login", {
        email: email,
        password: password,
      });
  
      const accessToken = response.data.access_token;
      setUser(response.data.user);
      setToken(accessToken);
      setIsLoggedIn(true);
      localStorage.setItem("access_token", accessToken);
  
      // Ha van elmentett profilkép, állítsuk be, ha nincs, akkor alapértelmezett
      const storedProfilePic = localStorage.getItem("userProfilePic");
      setUserProfilePic(storedProfilePic || "https://www.w3schools.com/howto/img_avatar.png");
  
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
    if (!token) return; // Ha nincs token, ne próbáljuk meg lekérni az adatokat

    try {
      const response = await myAxios.get("api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setIsLoggedIn(true);
      const storedProfilePic = localStorage.getItem("userProfilePic");
      setUserProfilePic(storedProfilePic || "https://www.w3schools.com/howto/img_avatar.png");
    } catch (error) {
      console.log(
        "Felhasználó lekérdezési hiba:",
        error.response ? error.response.data : error.message
      );
      logout(); // Ha a kérés sikertelen, automatikusan kijelentkeztetjük a felhasználót
    }
  };

  // Kijelentkezés
  const logout = async () => {
    await csrf();
    try {
      await myAxios.post("api/logout");
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      setUserProfilePic(null);
      localStorage.removeItem("userProfilePic");
      localStorage.removeItem("access_token");
      navigate("/bejelentkezes");
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
        const base64Image = reader.result;
        updateProfilePic(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Alkalmazás indításakor ellenőrizzük, hogy érvényes-e a token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      getUser(); // Ha van token, próbáljuk lekérni a felhasználói adatokat
    } else {
      setIsLoggedIn(false); // Ha nincs token, a felhasználó nincs bejelentkezve
      setUser(null);
    }
  
    // Profilkép beállítása, ha van elmentett
    const storedProfilePic = localStorage.getItem("userProfilePic");
    setUserProfilePic(storedProfilePic || "https://www.w3schools.com/howto/img_avatar.png");
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
