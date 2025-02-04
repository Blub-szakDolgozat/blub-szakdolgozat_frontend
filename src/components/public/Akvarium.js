import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Akvarium = () => {
    const [viziLenyek, setViziLenyek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedViziLeny, setSelectedViziLeny] = useState(null); // State to store the selected creature

    useEffect(() => {
        axios.get('http://localhost:8000/api/user-lenyei', { withCredentials: true })
            .then(response => {
                setViziLenyek(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleCardClick = (viziLeny) => {
        setSelectedViziLeny(viziLeny); // Set the selected creature when a card is clicked
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '300px', marginRight: '20px' }}>
                <h2>Akvárium:</h2>
                {viziLenyek.length === 0 ? (
                    <p>Még nincs vizi lény az akváriumban!</p>
                ) : (
                    <div className="vizi-lenyek">
                        {viziLenyek.map((viziLeny) => (
                            <div
                                className="vizi-leny"
                                key={viziLeny.nev}
                                onClick={() => handleCardClick(viziLeny)} // Click event for each card
                                style={{
                                    cursor: 'pointer',
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                }}
                            >
                                <h3>{viziLeny.nev}</h3>
                                <p><strong>Fajta:</strong> {viziLeny.fajta}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedViziLeny && (
                <div style={{ flex: 1 }}>
                    <h2>{selectedViziLeny.nev}</h2>
                    <p><strong>Fajta:</strong> {selectedViziLeny.fajta}</p>
                    <p><strong>Ritkaság:</strong> {selectedViziLeny.ritkasagi_szint}</p>
                    <p>{selectedViziLeny.leiras}</p>
                    {selectedViziLeny.kep && <img src={`/storage/${selectedViziLeny.kep}`} alt={selectedViziLeny.nev} />}
                </div>
            )}
        </div>
    );
};

export default Akvarium;
