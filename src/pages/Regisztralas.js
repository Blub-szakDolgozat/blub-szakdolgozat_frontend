import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Regisztralas() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }
    console.log("Regisztrációs adatok:", { email, password });
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
