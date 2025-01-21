import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext"; // AuthContext importálása
import { useNavigate } from "react-router-dom"; // Navigációhoz
import ProfileKep from "../components/ProfilKep";

export default function Profil() {
  const { logout, isLoggedIn } = useContext(AuthContext); // Bejelentkezett státusz és kijelentkezés
  const [profilKep, setProfilKep] = useState(null); // Profilkép állapot
  const [selectedImage, setSelectedImage] = useState(null); // Kiválasztott kép
  const [userName, setUserName] = useState("Felhasználó neve"); // Felhasználói név
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/bejelentkezes"); // Ha nem vagyunk bejelentkezve, navigáljunk a bejelentkezési oldalra
    }
  }, [isLoggedIn, navigate]); // Ha `isLoggedIn` változik, akkor fut le a navigálás

  // Képváltoztatás kezelése
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // A kiválasztott kép beállítása
      };
      reader.readAsDataURL(file); // A fájl adatainak beolvasása
    }
  };

  // Profilkép mentése
  const handleSave = () => {
    if (selectedImage) {
      setProfilKep(selectedImage); // Beállítjuk a profilképet a kiválasztott képre
      alert("Profilkép mentve!"); // Üzenet a mentésről
    } else {
      alert("Kérlek válassz egy képet!"); // Ha nem választott képet
    }
  };

  // Kijelentkezés funkció
  const handleLogout = () => {
    logout(); // Kijelentkezés hívása az AuthContextből
    alert("Sikeresen kijelentkeztél!"); // Kijelentkezés üzenet
    navigate("/bejelentkezes"); // Navigálás a bejelentkezési oldalra
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h2>Profil</h2>
          <div className="profile-section mt-4">
            <div className="image-container">
              {/* A kiválasztott profilkép vagy alapértelmezett kép */}
              <ProfileKep profilePic={profilKep} />

              <Form.Group controlId="profileImageUpload" className="mt-3">
                <Form.Label className="btn btn-secondary">
                  Kép módosítása
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="d-none"
                  />
                </Form.Label>
              </Form.Group>
            </div>

            {/* Kép mentése gomb */}
            <Button variant="primary" onClick={handleSave} className="mt-3">
              Mentés
            </Button>

            <h4 className="mt-3">{userName}</h4>

            {/* Kijelentkezés gomb */}
            <Button variant="danger" onClick={handleLogout} className="mt-3">
              Kijelentkezés
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
