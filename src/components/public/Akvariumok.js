import React, { useEffect, useState } from 'react';
import './Akvarium.css';
import Akvarium from './Akvarium';
import { myAxios } from "../../contexts/MyAxios";

import { Col, Row } from 'react-bootstrap';

const Akvariumok = () => {
    const [viziLenyek, setViziLenyek] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [selectedViziLeny, setSelectedViziLeny] = useState(null); 


    useEffect(() => {
        myAxios.get('/api/user-lenyei')
          .then(response => {
            const data = response.data || [];
            setViziLenyek(data); 
            setLoading(false); 
          })
          .catch(err => {
            setError(err.message); 
            setLoading(false); 
          });
      }, []);

    if (loading) {
        return <div>Betöltés...</div>;
    }

   
    if (error) {
        return <div>Hiba történt: {error}</div>;
    }

    const handleAkvariumClick = (akvarium) => {
        setSelectedViziLeny(akvarium);
    };

    return (
        <Row className="akvarium-container">
            <div className='szovegdoboz'>
                <h1>Akvárium</h1>
                <p>Fedezd fel a vízi lényeinket!</p>
            </div>

            {/* Kiválasztott vízi lény (jobb oldalon) */}
            {selectedViziLeny && (
                <Col className='selected-akvarium' style={{ backgroundImage: `url(http://localhost:8000/${selectedViziLeny.kep})` }}>
                    <div className='akvarium-info'>
                        <h2 className='nev'>{selectedViziLeny.nev}</h2>
                        <p><strong>Fajta:</strong> {selectedViziLeny.fajta}</p>
                        <p><strong>Ritkaság:</strong> {selectedViziLeny.ritkasagi_szint}</p>
                        <p>{selectedViziLeny.leiras}</p>
                    </div>
                </Col>
            )}

            {/* Bal oldali vízi lények lista */}
            <Col className='akvarium-list'>
                <div className='akvarium-scroll'>
                    {viziLenyek.map((elem, index) => (
                        <Akvarium 
                            obj={elem} 
                            key={index} 
                            onSelect={handleAkvariumClick}
                        />
                    ))}
                </div>
            </Col>
        </Row>
    );
};

export default Akvariumok;
