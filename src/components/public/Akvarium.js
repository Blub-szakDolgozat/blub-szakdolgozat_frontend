import React, { useEffect, useState } from 'react';
import { myAxios } from "../../contexts/MyAxios"; 
import { Container, Card, Row, Col } from 'react-bootstrap';
import './Akvarium.css';

const Akvarium = () => {
  const [viziLenyek, setViziLenyek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedViziLeny, setSelectedViziLeny] = useState(null);

  useEffect(() => {
    myAxios.get('/api/user-lenyei')
      .then(response => {
        const data = response.data || [];
        console.log(data); // Ellenőrizd az adatokat
        setViziLenyek(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Hiba történt: {error}</div>;
  }

  return (
    <div className="akvarium-container">
      <div className='szovegdoboz'>
        <h1>Akvárium</h1>
        <p>Fedezd fel a vízi lényeinket!</p>
      </div>

      <Row>
        <Col md={4} className="aquarium-box">
          <div className="video-scroll">
            {viziLenyek.map((viziLeny) => (
              <div 
                key={viziLeny.id} 
                className="video-item"
                onClick={() => setSelectedViziLeny(viziLeny)}
              >
                <Card className="custom-card">
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:8000/${viziLeny.kep}`}
                    alt={viziLeny.nev}
                  />
                  <Card.Body>
                    <Card.Title>{viziLeny.nev}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Col>

        <Col md={8} className="detailed-card">
          {selectedViziLeny && (
            <Card className="custom-card detailed">
              <Card.Img 
                variant="top" 
                src={`http://localhost:8000/${selectedViziLeny.kep}`}
                alt={selectedViziLeny.nev}
              />
              <Card.Body>
                <Card.Title>{selectedViziLeny.nev}</Card.Title>
                <Card.Text>
                  <strong>Fajta:</strong> {selectedViziLeny.fajta}<br />
                  <strong>Ritkaság:</strong> {selectedViziLeny.ritkasagi_szint}<br />
                  {selectedViziLeny.leiras}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Akvarium;