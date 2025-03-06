import React, { useEffect, useState } from 'react';
import './Akvarium.css';
import Akvarium from './Akvarium';
import { myAxios } from "../../contexts/MyAxios";
import useAdminContext from '../../contexts/AdminContext';
import { Col, Row } from 'react-bootstrap';

const Akvariumok = () => {
    const [viziLenyek, setViziLenyek] = useState([]); // Tárolja a vízi lények listáját
    const [loading, setLoading] = useState(true); // Betöltési állapot
    const [error, setError] = useState(null); // Hibakezelés
    const [selectedViziLeny, setSelectedViziLeny] = useState(null); // Kiválasztott vízi lény
    const { kepekLista } = useAdminContext();

    // Adatok lekérése az API-ból
    useEffect(() => {
        myAxios.get('/api/user-lenyei')
          .then(response => {
            const data = response.data || [];
            setViziLenyek(data); // A kapott adatokat elmentjük a viziLenyek állapotba
            setLoading(false); // Betöltés befejezve
          })
          .catch(err => {
            setError(err.message); // Hiba esetén eltároljuk az üzenetet
            setLoading(false); // Betöltés befejezve hibával
          });
      }, []);
    
    // Ha még töltődik, megjelenítjük a "Betöltés..." üzenetet
    if (loading) {
        return <div>Betöltés...</div>;
    }

    // Ha hiba történt a lekérésnél, kiírjuk a hibát
    if (error) {
        return <div>Hiba történt: {error}</div>;
    }

    // Kattintás esemény kezelése
    const handleAkvariumClick = (akvarium) => {
        setSelectedViziLeny(akvarium); // Kiválasztott vízi lény frissítése
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
                    {kepekLista.map((elem, index) => (
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
