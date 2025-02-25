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
  const [tempUsername, setTempUsername] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");  // Jelszó mező hozzáadása
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/bejelentkezes");
    }
  }, [isLoggedIn, navigate]);  // Ha a user nincs bejelentkezve, irányítson át
  
  useEffect(() => {
    console.log("Felhasználó adatai:", user); // Ellenőrizzük a user objektumot
  
    if (user) {
      setUsername(user.name || "Ismeretlen felhasználó"); // Helyesen a `name` kulcsot használjuk
      setTempUsername(user.name || "");
    }
  }, [user]);
  
  
  const handleSave = async () => {
    if (!user || !user.azonosito) {
      console.error("Felhasználói ID nem található.");
      return; // Ne folytasd a mentést, ha nincs érvényes felhasználó
    }
  
    try {
      const updates = {};
  
      // Ha van új felhasználónév, akkor azt küldjük
      if (tempUsername) {
        updates.name = tempUsername;
      }
  
      // Ha van új e-mail cím, akkor azt küldjük
      if (email) {
        updates.email = email;
      }
  
      // Ha van új jelszó, azt is küldjük
      if (password) {
        updates.password = password;
      }
  
      // Ha van új profilkép, azt is küldhetjük
      if (selectedImage !== userProfilePic) {
        updates.profilkep = selectedImage;
      }
  
      // Küldjük az adatokat a backend API-ra
      const response = await fetch(`http://localhost:8000/api/update-user/${user.azonosito}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
  
      if (!response.ok) {
        throw new Error("Hiba történt az adatok mentésekor");
      }
  
      const data = await response.json();
      console.log("Adatok sikeresen frissítve:", data);
  
      // Frissítjük az állapotokat az új adatokkal
      if (data.user) {
        setUsername(data.user.name);
        setEmail(data.user.email);
        // Ha frissült a profilkép
        if (data.user.profilkep) {
          setSelectedImage(data.user.profilkep);
        }
      }
  
    } catch (error) {
      console.error("Hiba:", error);
    }
  };
  
  
  

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
                  <p><strong>Felhasználónév:</strong> {username || "Nincs megadva"}</p>
                  <p><strong>Email cím:</strong> {email || "Nincs email megadva"}</p>
                </div>

                {/* Felhasználónév módosítása */}
                <Form.Group controlId="username" className="mt-3">
                  <Form.Label>Felhasználói név módosítása:</Form.Label>
                  <Form.Control
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)} // Csak a tempUsername frissül
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
