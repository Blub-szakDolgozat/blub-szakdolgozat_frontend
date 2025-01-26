import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Video(props) {

    const kattintasKezeles = () => {
        if (props.obj.link) {
        window.open(props.obj.link, '_blank'); // új ablakban, külön oldalon nyílik meg a videó
        } else {
        console.log("A videóhoz nem tartozik link.");
        }
    };

    return (
        <div>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.obj.nyitokep} />
                <Card.Body>
                    <Card.Title>{props.obj.cim}</Card.Title>
                    <Button variant="primary" onClick={kattintasKezeles}>Megnézem</Button>
                </Card.Body>
            </Card>
        </div>
  )
}