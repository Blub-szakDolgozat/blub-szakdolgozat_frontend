import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROFILE_PICS = [
  "https://www.w3schools.com/howto/img_avatar.png",
  "https://www.w3schools.com/howto/img_avatar2.png",
  "https://www.w3schools.com/w3images/avatar2.png",
  "https://www.w3schools.com/w3images/avatar6.png",
];

export default function Profil() {
  const { logout, isLoggedIn, userProfilePic, updateProfilePic } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(userProfilePic || "https://www.w3schools.com/howto/img_avatar.png");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/bejelentkezes");
    }
  }, [isLoggedIn, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedImage) {
      updateProfilePic(selectedImage);
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
            {/* Kiválasztott kép nagyobb megjelenítése */}
            <div className="selected-image-container mb-4">
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
            </div>

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
                        borderRadius: "50%",
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
