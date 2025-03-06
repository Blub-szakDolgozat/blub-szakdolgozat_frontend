import React, { useState } from 'react';
import Cikk from './Cikk';
import './Cikk.css';
import { Col, Row } from 'react-bootstrap';


import useAdminContext from '../../contexts/AdminContext';

export default function Cikkek() {
    const { cikkLista } = useAdminContext();
    const [selectedCikk, setSelectedCikk] = useState(null);

    const handleCikkClick = (cikk) => {
        setSelectedCikk(cikk); // Beállítjuk az aktuálisan kiválasztott cikket
    };

    return (
        <Row className="cikk-container" >
            <div className='szovegdoboz'>
            <h1>Cikkek</h1>
            <p>Oldalunkon sok különböző környezetvédelmi oktatóvideó található. A videók számos témát dolgoznak fel, köztük jelentősen felhívják a figyelmet a műanyag szemetelésének következményeire és veszélyeire.</p>
            <p className='uzenet'>Csatlakozz a zöldebb jövőhöz!</p>
            </div>

            {/* Kiválasztott videó (bal oldalon) */}
            {selectedCikk && (
                <Col className='selected-cikk' style={{ backgroundImage: `url(http://localhost:8000/${selectedCikk.kepek})` }} >
                    <div className='cikk-info' >
                        <h2 className='felirat'>{selectedCikk.cim}</h2>
                        <p className=''>{selectedCikk.leiras}</p>
                    </div>
                </Col>
            )}
            
            {/* Jobb oldali videók lista görgetéssel */}
            <Col className='cikk-list'>
                <div className='cikk-scroll'>
                    {cikkLista.map((elem, index) => (
                        <Cikk obj={elem} key={index} onSelect={handleCikkClick} />
                    ))}
                </div>
            </Col>
        </Row>
    );
}
