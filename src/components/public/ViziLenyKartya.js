import React from 'react';
import { Card, Col } from 'react-bootstrap';

export default function ViziLenyKartya({ adat }) {
  return (
    <Card className="shadow-lg border-0 rounded">
      <Card.Body>
        {/* Display the vizi_leny_id */}
        <Card.Title>{adat.vizi_leny_id}</Card.Title> {/* Show vizi_leny_id */}
        <Card.Text>{adat.nev}</Card.Text>
        <Card.Img variant="top" src={`/storage/${adat.kep}`} alt={adat.nev} />
        <Card.Text>{adat.fajta}</Card.Text>
        <Card.Text>{adat.ritkasagi_szint}</Card.Text>
        <Card.Text>{adat.leiras}</Card.Text>
      </Card.Body>
    </Card>
  );
}
