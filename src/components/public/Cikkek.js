import React, { useState } from 'react';
import Cikk from './Cikk';
import './Cikk.css';
import useAdminContext from '../../contexts/AdminContext';

export default function Cikkek() {
    const { cikkLista } = useAdminContext();
    const [selectedCikk, setSelectedCikk] = useState(null);

    const handleCikkClick = (cikk) => {
        setSelectedCikk(cikk); // Beállítjuk az aktuálisan kiválasztott cikket
    };

    const closeCikk = () => {
        setSelectedCikk(null);
    };

    return (
        <div>
            <h1>Cikkek</h1>
            <p>Oldalunkon sok különböző környezetvédelmi cikk található</p>
            <p className='uzenet'>Csatlakozz a zöldebb jövőhöz!</p>

            {/* Cikkek listája */}
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                {cikkLista.map((elem, index) => (
                    <Cikk obj={elem} key={index} onClick={() => handleCikkClick(elem)} />
                ))}
            </div>

            {/* Nagyobb cikk nézet */}
            {selectedCikk && (
                <div className="backdrop">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeCikk}>✖</button>
                        <h2>{selectedCikk.cim}</h2>
                        <img src={`http://localhost:8000/${selectedCikk.kepek}`} alt={selectedCikk.cim} />
                        <div dangerouslySetInnerHTML={{ __html: selectedCikk.leiras }} />
                        <p>Publikálva: {selectedCikk.publikalva}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
