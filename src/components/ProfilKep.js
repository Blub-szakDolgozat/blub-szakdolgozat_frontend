import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileKep = () => {
  const [Login, setLogin] = useState(true); // Állapot a bejelentkezéshez
  const navigate = useNavigate(); // useNavigate hook a navigációhoz

  // Kattintás kezelése
  const handleProfileClick = () => {
    if (Login) {
      navigate('/akvarium'); // Ha be van jelentkezve, navigálunk
    } else {
      alert('Kérlek jelentkezz be!'); // Ha nincs bejelentkezve, figyelmeztetés
    }
  };

  return (
    <div
      style={{
        width: '50px', // Méret beállítása
        height: '50px',
        borderRadius: '50%', // Kör alakú profilkép
        position: 'relative',
        cursor: Login ? 'pointer' : 'not-allowed', // Kattinthatóság
        backgroundColor: '#f1f1f1', // Háttérszín a profilképhez
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleProfileClick} // Kattintás kezelése
    >
      {/* Font Awesome ikon (felhasználó ikon) */}
      <i
        className="fas fa-user"
        style={{
          fontSize: '30px',
          color: '#333', // Ikon szín
        }}
      ></i>
    </div>
  );
};

export default ProfileKep;
