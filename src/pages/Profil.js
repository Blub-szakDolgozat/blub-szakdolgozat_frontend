import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext"; // AuthContext importálása
import { useNavigate } from "react-router-dom"; // Navigációhoz
import ProfileKep from "../components/ProfilKep";

// Elérhető alapértelmezett profilképek
const DEFAULT_PROFILE_PICS = [
  "https://www.w3schools.com/howto/img_avatar.png",
  "https://www.w3schools.com/howto/img_avatar2.png",
  "https://www.w3schools.com/w3images/avatar2.png",
  "https://www.w3schools.com/w3images/avatar6.png",
];

export default function Profil() {
  const { logout, isLoggedIn, userProfilePic, updateProfilePic } = useContext(AuthContext); // Bejelentkezett státusz, profilkép, és funkciók
  const [selectedImage, setSelectedImage] = useState(userProfilePic || "https://www.w3schools.com/howto/img_avatar.png"); // Kiválasztott kép
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/bejelentkezes"); // Ha nem vagyunk bejelentkezve, navigáljunk a bejelentkezési oldalra
    }
  }, [isLoggedIn, navigate]);

  // Kép feltöltése
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // Átmenetileg megjeleníti a feltöltött képet
      };
      reader.readAsDataURL(file);
    }
  };

  // Profilkép mentése
  const handleSave = () => {
    if (selectedImage) {
      updateProfilePic(selectedImage); // Profilkép mentése az AuthContext-ben
      alert("Profilkép mentve!");
    } else {
      alert("Kérlek válassz egy képet!");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <div className="profile-section mt-4">
            <div className="image-container">
              {/* Alapértelmezett profilképek választása */}
              <div className="default-profile-pics mt-3">
                <h5>Válassz egy alapértelmezett képet:</h5>
                <div className="d-flex justify-content-center">
                  {DEFAULT_PROFILE_PICS.map((pic, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(pic)}
                      style={{
                        margin: "0 10px",
                        cursor: "pointer",
                        border: selectedImage === pic ? "3px solid blue" : "none",
                      }}
                    >
                      <img
                        src={pic}
                        alt={`Default ${index}`}
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                      />
                    </div>
                  ))}
                </div>
                <Form.Group controlId="profileImageUpload" className="mt-3">
                  <Form.Label className="btn btn-secondary">
                    Kép feltöltése
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="d-none"
                    />
                  </Form.Label>
                </Form.Group>
              </div>
            </div>

            {/* Kép mentése gomb */}
            <Button variant="primary" onClick={handleSave} className="mt-3">
              Mentés
            </Button>

            <h4 className="mt-3">Felhasználói név: {"Valaki"}</h4>

            {/* Kijelentkezés gomb */}
            <Button variant="danger" onClick={logout} className="mt-3">
              Kijelentkezés
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
