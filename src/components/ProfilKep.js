import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // AuthContext importálása

const ProfileKep = () => {
  const { isLoggedIn, userProfilePic } = useContext(AuthContext); // A profilképet és a bejelentkezési állapotot egyszerre
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profil"); // Ha be vagy jelentkezve, átirányít a profil oldalra
    } else {
      alert("Kérlek jelentkezz be!"); // Ha nincs bejelentkezve, értesít
      navigate("/bejelentkezes"); // Navigálás a bejelentkezési oldalra
    }
  };

  const imageSrc = userProfilePic || "https://www.w3schools.com/howto/img_avatar.png";

  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        position: "relative",
        cursor: isLoggedIn ? "pointer" : "not-allowed", // Ha be vagy jelentkezve, kattintható
        backgroundColor: "#f1f1f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={handleProfileClick}
    >
      <img
        src={imageSrc} // A profilkép forrása
        alt="Profilkép"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%", // Kerek profilkép
        }}
      />
    </div>
  );
};

export default ProfileKep;
