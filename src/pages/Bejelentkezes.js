import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";


export default function Bejelentkezes({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {login} =useContext(AuthContext);


  function handleSubmit(event) {
    event.preventDefault();
    const adat = {
        email: email,
        password: password,
    };
    console.log("Bejelentkezés sikeres:", adat);
    login(adat);
  }

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
