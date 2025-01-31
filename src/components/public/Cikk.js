import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Cikk({ obj, onClick }) {
    return (
        <Card style={{ width: '18rem', cursor: 'pointer' }} onClick={onClick}>
            <Card.Img variant="top" src={`http://localhost:8000/${obj.kepek}`} />
            <Card.Body>
                <Card.Title>{obj.cim}</Card.Title>
                <Card.Text>
                    {obj.leiras.substring(0, 76)} {/* Csak az első 100 karakter */}
                </Card.Text>
                <Button variant="primary" onClick={(e) => { e.stopPropagation(); onClick(obj); }}>
                    Megnézem
                </Button>
            </Card.Body>
        </Card>
    );
}
