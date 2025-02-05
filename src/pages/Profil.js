import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROFILE_PICS = [
  "https://www.w3schools.com/howto/img_avatar.png",
  "https://www.w3schools.com/howto/img_avatar2.png",
  "https://www.w3schools.com/w3images/avatar2.png",
  "https://www.w3schools.com/w3images/avatar6.png",
];

export default function Profil() {
  const { logout, isLoggedIn, userProfilePic, updateProfilePic, user, updatePassword } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(userProfilePic || "https://www.w3schools.com/howto/img_avatar.png");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");  // Jelszó mező hozzáadása
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
    if (selectedImage && username && email && password) {
      updateProfilePic(selectedImage);
      updatePassword(password);  // Jelszó frissítése
      alert(`Profilkép és adatok mentve! (${username}, ${email})`);
    } else {
      alert("Kérlek válassz egy képet, add meg a nevet, emailt és a jelszót!");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Card className="profile-card">
            <Card.Body>
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
                      border: "3px solid #ddd",
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

                {/* Felhasználói adatok megjelenítése */}
                <div className="user-info mt-4">
                  <h4>Profil Információk</h4>
                  <p><strong>Felhasználónév:</strong> {username}</p>
                  <p><strong>Email cím:</strong> {email}</p>
                </div>

                {/* Felhasználónév módosítása */}
                <Form.Group controlId="username" className="mt-3">
                  <Form.Label>Felhasználói név módosítása:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Írd be a neved..."
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email cím módosítása:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Írd be az email címed..."
                  />
                </Form.Group>

                {/* Jelszó módosítása */}
                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Jelszó módosítása:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Írd be az új jelszót..."
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <Button variant="danger" onClick={logout}>
                    Kijelentkezés
                  </Button>

                  <Button variant="primary" onClick={handleSave}>
                    Mentés
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
