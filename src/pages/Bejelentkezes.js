import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Bejelentkezési adatok:", { email, password });
    navigate("/dashboard"); // Példa, hogy bejelentkezés után átirányítjuk a dashboard oldalra
  }

  const handleGoToRegister = () => {
    navigate("/regisztralas"); // Regisztrációs oldalra navigálás
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Bejelentkezés</h2>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Jelszó</Form.Label>
              <Form.Control
                type="password"
                placeholder="Add meg a jelszavad"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Bejelentkezés
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              Nincs még fiókod?{" "}
              <button onClick={handleGoToRegister} className="btn btn-link">
                Új fiók létrehozása
              </button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
