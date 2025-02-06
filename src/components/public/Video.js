import React from 'react';
import Card from 'react-bootstrap/Card';
import './Videok.css';

export default function Video({ obj, onSelect }) {
    const kattintasKezeles = () => {
        if (onSelect) {
            onSelect(obj); // Kiválasztja a videót
        }
    };

    return (
        <div className="d-flex justify-content-center mb-4" onClick={kattintasKezeles}>
            <Card className="custom-card">
                <Card.Img variant="top" src={"http://localhost:8000/" + obj.nyitokep} />
                <Card.Body>
                    <Card.Title>{obj.cim}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
}
