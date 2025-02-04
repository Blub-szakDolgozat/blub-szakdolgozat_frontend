import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import ViziLenyKartya from './ViziLenyKartya';

const Akvarium = () => {
  const [viziLenyek, setViziLenyek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedViziLeny, setSelectedViziLeny] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/user-lenyei', { withCredentials: true })
      .then(response => {
        setViziLenyek(response.data);
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
    return <div>Error: {error}</div>;
  }

  const handleCardClick = (viziLeny) => {
    setSelectedViziLeny(viziLeny);
  };

  return (
    <div>
      <h2>Akvárium:</h2>
      <Container>
        {viziLenyek.map((viziLeny) => (
          <ViziLenyKartya adat={viziLeny} key={viziLeny.vizi_leny_id} />
        ))}
      </Container>

      {selectedViziLeny && (
        <div style={{ flex: 1 }}>
          <h2>{selectedViziLeny.nev}</h2>
          <p><strong>Fajta:</strong> {selectedViziLeny.fajta}</p>
          <p><strong>Ritkaság:</strong> {selectedViziLeny.ritkasagi_szint}</p>
          <p>{selectedViziLeny.leiras}</p>
          {selectedViziLeny.kep && <img src={`/kepek/${selectedViziLeny.kep}`} alt={selectedViziLeny.nev} />}
        </div>
      )}
    </div>
  );
};

export default Akvarium;
