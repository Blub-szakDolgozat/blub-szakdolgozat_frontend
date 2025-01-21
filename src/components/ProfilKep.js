import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // AuthContext importálása

const ProfileKep = ({ profilePic }) => {
  const { isLoggedIn } = useContext(AuthContext); // Bejelentkezett státusz ellenőrzése
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profil'); // Ha be van jelentkezve, navigáljunk a profil oldalra
    } else {
      alert('Kérlek jelentkezz be!'); // Ha nincs bejelentkezve
      navigate('/bejelentkezes'); // Irányítsuk a bejelentkezési oldalra
    }
  };

  return (
    <div
      style={{
        width: '50px', // Méret beállítása
        height: '50px',
        borderRadius: '50%', // Kör alakú profilkép
        position: 'relative',
        cursor: isLoggedIn ? 'pointer' : 'not-allowed', // Kattinthatóság bejelentkezés függvényében
        backgroundColor: '#f1f1f1', // Háttérszín a profilképhez
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleProfileClick} // Kattintás kezelése
    >
      {/* Ha van profilkép, akkor azt jelenítjük meg, különben alapértelmezett ikon */}
      {profilePic ? (
        <img
          src={profilePic}
          alt="Profilkép"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      ) : (
        <i
          className="fas fa-user"
          style={{
            fontSize: '30px',
            color: '#333', // Ikon szín
          }}
        ></i>
      )}
    </div>
  );
};

export default ProfileKep;
