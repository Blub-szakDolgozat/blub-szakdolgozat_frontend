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
  const { logout, isLoggedIn, user, updateUserData } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(user?.profilkep || "https://www.w3schools.com/howto/img_avatar.png");
  const [username, setUsername] = useState(user?.name || "");
  const [tempUsername, setTempUsername] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [tempEmail, setTempEmail] = useState("");
  const [password, setPassword] = useState("");  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/bejelentkezes");
    }
  }, [isLoggedIn, navigate]);  // Ha a user nincs bejelentkezve, irányítson át
  
  useEffect(() => {
    if (user) {
      setUsername(user.name || "Ismeretlen felhasználó");
      setTempUsername(user.name || "");
      setEmail(user.email || ""); 
      setTempEmail(user.email || "");
    }
  }, [user]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name);
      setEmail(user.email);
      if (user.profilkep) setSelectedImage(user.profilkep);
    }
  }, []);
  
  useEffect(() => {
    if (!user || !user.azonosito) {
      console.error("Nincs bejelentkezett felhasználó vagy hiányzó azonosító.");
      return;
    }
  
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/get-user/${user.azonosito}`, { //http kérést küld hogy frissitse a a felhasználó adatokat backendből
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) throw new Error("Felhasználó nem található");
  
        const data = await response.json();
        setUsername(data.user.name);
        localStorage.setItem('user', JSON.stringify(data.user));
      } catch (error) {
        console.error("Hiba a felhasználó lekérésekor:", error);
      }
    };
  
    fetchUser();
  }, [user?.azonosito]); // Ellenőrizzük, hogy van-e user és azonosítója
  
  
  
  
  const getCsrfToken = () => {
    const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };
  
  const handleSave = async () => {
    if (!user || !user.azonosito) {
      console.error("Felhasználói ID nem található.");
      return;
    }
  
    try {
      const updates = {
        name: tempUsername || username,
        email: tempEmail || email,
      };
  
      if (password.trim() !== "") {
        updates.password = password;
      }
  
      let formData = new FormData();
      Object.keys(updates).forEach(key => formData.append(key, updates[key]));
  
      if (selectedImage.startsWith("data:image")) {
        // 🔹 Ha a kép base64 formátumú, konvertáljuk fájllá
        const blob = await fetch(selectedImage).then(res => res.blob());
        formData.append("profilkep", blob, "profile.jpg");
      } else {
        // 🔹 Ha csak egy URL van megadva (nem feltöltött kép), akkor ezt mentjük
        formData.append("profilkep_url", selectedImage);
      }
  
      const response = await fetch(`http://localhost:8000/api/update-user/${user.azonosito}`, {
        method: "POST",
        headers: {
          "X-XSRF-TOKEN": getCsrfToken(),
        },
        credentials: "include",
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Hiba történt az adatok frissítésekor");
      }
  
      setUsername(data.user.name);
      setTempUsername(data.user.name);
      setEmail(data.user.email);
      setTempEmail(data.user.email);
      setSelectedImage(data.user.profilkep);
  
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userProfilePic", data.user.profilkep);
  
      await updateUserData();
      console.log("Adatok sikeresen frissítve:", data);
    } catch (error) {
      console.error("Hiba a mentéskor:", error);
    }
  };
  
  
  
  
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result); // 🔹 Data URL megjelenítés
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
                    value={tempEmail} // 🔹 Most már a tempEmail-t használja
                    onChange={(e) => setTempEmail(e.target.value)} // 🔹 Csak a tempEmail frissül
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
