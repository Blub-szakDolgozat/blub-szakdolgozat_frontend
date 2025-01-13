import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { myAxios } from "../contexts/MyAxios";

export default function Bejelentkezes({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Hibakezeléshez
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await myAxios.post("/login", { email, password });
      console.log("Bejelentkezés sikeres:", data);

      localStorage.setItem("authToken", data.token); 
      onLogin(data.user); 

      navigate("/home");
    } catch (error) {
      console.error("Bejelentkezési hiba:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Hiba történt a bejelentkezés során.");
    }
  };

  const handleClick = () => {
    navigate("/regisztralas");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Bejelentkezés</h2>
          {error && <p className="text-danger text-center">{error}</p>}
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
              <button onClick={handleClick} className="btn btn-link">
                Regisztráció
              </button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
