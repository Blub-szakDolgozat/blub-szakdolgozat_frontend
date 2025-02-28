import React, { useEffect, useState } from 'react';
import { myAxios } from "../../contexts/MyAxios"; 
import { Container, Card, Row, Col } from 'react-bootstrap';
import './Akvarium.css';

const ErrorMessage = ({ error }) => (
  <div>
    <p><strong>Hiba történt:</strong> {error}</p>
  </div>
);

const Akvarium = () => {
  const [viziLenyek, setViziLenyek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedViziLeny, setSelectedViziLeny] = useState(null);

  useEffect(() => {
    // Kérések myAxios-szal
    myAxios.get('/api/user-lenyei') // A baseURL már benne van a myAxios-ban
      .then(response => {
        const data = response.data || [];
        setViziLenyek(data);
        if (data.length > 0) {
          setSelectedViziLeny(data[0]);
        }
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
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="akvarium-container">
      <div className='szovegdoboz'>
        <h1>Akvárium</h1>
        <p>Fedezd fel a vízi lényeinket! Minden lény egyedi történettel rendelkezik, és fontos szerepet játszik az ökoszisztémában.</p>
      </div>

      <Row>
        {/* Bal oldali kis akvárium doboz a választható kártyákkal */}
        <Col md={4} className="aquarium-box">
          <div className="video-scroll">
            {viziLenyek.map((viziLeny) => (
               <div 
               key={viziLeny.vizi_leny_id} // Egyedi key a vizi_leny_id alapján
               className="video-item"
               onClick={() => setSelectedViziLeny(viziLeny)}
             >
                <Card className="custom-card">
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:8000/${viziLeny.kep}`} // Közvetlen URL összeállítása
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

        {/* Jobb oldali részletes kártya */}
        <Col md={8} className="detailed-card">
          {selectedViziLeny && (
            <Card className="custom-card detailed">
              <Card.Img 
                variant="top" 
                src={`http://localhost:8000/${selectedViziLeny.kep}`} // Közvetlen URL összeállítása
                alt={selectedViziLeny.nev}
              />
              <Card.Body>
                <Card.Title>{selectedViziLeny.nev}</Card.Title>
                <Card.Text>
                  <strong>Fajta:</strong> {selectedViziLeny.fajta || "Nincs adat"}<br />
                  <strong>Ritkaság:</strong> {selectedViziLeny.ritkasagi_szint}<br />
                  {selectedViziLeny.leiras || "Nincs leírás elérhető."}
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