import React, {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";


export default function Regisztralas() {
  const [felhasznalonev, setFelhasznalonev] = useState(""); 
  const [email, setEmail] = useState("");
  const [jelszo, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {regisztracio} =useContext(AuthContext);
 
  
  function handleSubmit(event) {
    event.preventDefault();
    if (jelszo !== confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }
    const adat = {
      felhasznalonev: felhasznalonev,
      email: email,
      jelszo:regi_jelszo,
      confirmPassword: confirmPassword
    };
    console.log("Regisztrációs adatok:", adat);
    regisztracio(adat);
    navigate("/bejelentkezes");
  }

  const handleClick = () => {
    navigate("/bejelentkezes");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Regisztráció</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="felhasznalonev">
              <Form.Label>Teljes Név</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add meg a teljes neved"
                value={felhasznalonev}
                onChange={(e) => setFelhasznalonev(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Add meg az email címed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="jelszo">
              <Form.Label>Jelszó</Form.Label>
              <Form.Control
                type="password"
                placeholder="Add meg a jelszavad"
                value={jelszo}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Jelszó megerősítése</Form.Label>
              <Form.Control
                type="password"
                placeholder="Add meg újra a jelszavad"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Regisztráció
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Már van fiókod?{" "}
              <button onClick={handleClick} className="btn btn-link">
                Bejelentkezés
              </button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
