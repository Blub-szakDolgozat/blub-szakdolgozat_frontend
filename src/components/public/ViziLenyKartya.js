import React from 'react';
import { Card } from 'react-bootstrap';

export default function ViziLenyKartya({ adat }) {
  return (
    <Card className="shadow-lg border-0 rounded">
      <Card.Body>
        <Card.Title>{adat.vizi_leny_id}</Card.Title>
        <Card.Text>{adat.nev}</Card.Text>
        <Card.Img variant="top" src={adat.kep} />
        <Card.Text>{adat.fajta}</Card.Text>
        <Card.Text>{adat.ritkasagi_szint}</Card.Text>
        <Card.Text>{adat.leiras}</Card.Text>
      </Card.Body>
    </Card>
  );
}
