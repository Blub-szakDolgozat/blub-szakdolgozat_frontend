import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { myAxios } from "./MyAxios";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // először hamisra állítja a bejeletkezést
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
  
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setUserProfilePic(response.data.user.profilkep);
        setIsLoggedIn(true); // itt meg igazra állítja
        
        localStorage.setItem("access_token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userProfilePic", response.data.user.profilkep);
  
        navigate("/akvarium"); // Sikeres bejelentkezés után navigáljon a akvariumra**
      }
    } catch (error) {
      console.log("Bejelentkezési hiba:", error);
    }
  };
  

  // Felhasználó adatainak lekérése
  const getUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      setUserProfilePic(null);
      return;
    }
  
    try {
      const response = await myAxios.get("api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.data) {
        console.error("Hibás API válasz, nincs user adat.");
        setUser(null);
        setUserProfilePic(null);
        return;
      }
  
      setUser(response.data);
      setUserProfilePic(response.data.profilkep); // 🔹 **Profilkép állapot frissítés**
      
      // 🔹 **Biztosan mentjük az új adatokat**
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("userProfilePic", response.data.profilkep);
      
      console.log("Felhasználó betöltve:", response.data);
    } catch (error) {
      console.error("Felhasználó lekérdezési hiba:", error);
      logout();
    }
  };
  
  
  
  // **ÚJ FÜGGVÉNY: updateUserData**
  const updateUserData = async () => {
    try {
      const response = await myAxios.get("api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.data) {
        setUser(response.data);
        setUserProfilePic(response.data.profilkep); // 🔹 **Profilkép állapot frissítés**
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("userProfilePic", response.data.profilkep); // **Frissített profilkép mentése**
      }
    } catch (error) {
      console.error("Hiba a felhasználói adatok frissítésekor:", error);
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
      setUserProfilePic(null);
      setIsLoggedIn(false); // Kijelentkezéskor false
      
      localStorage.removeItem("userProfilePic");
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
  
      console.log("Logout sikeres, minden adat törölve.");
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
    if (!user) {
      getUser() // Ha van token, próbáljuk lekérni a felhasználói adatokat
    } else {
      setIsLoggedIn(false); // Ha nincs token, a felhasználó nincs bejelentkezve
      setUser(null);
    }
  
    // Profilkép beállítása, ha van elmentett
    const storedProfilePic = localStorage.getItem("userProfilePic");
    setUserProfilePic(storedProfilePic || "https://www.w3schools.com/howto/img_avatar.png");
  }, []);
  
  useEffect(() => {
    console.log("AuthContext user:", user);
  }, [user]);
  
  

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
        updateUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
