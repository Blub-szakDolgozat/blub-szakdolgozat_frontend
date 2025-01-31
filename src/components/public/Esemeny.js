import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Esemeny(props) {

    const kattintasKezeles = () => {
        
    };

    return (
        <div>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={"http://localhost:8000/" + props.obj.kepek} />
                <Card.Body>
                    <Card.Title>{props.obj.cim}</Card.Title>
                    <Button variant="primary" onClick={kattintasKezeles}>Megnézem</Button>
                </Card.Body>
            </Card>
        </div>
  )
}