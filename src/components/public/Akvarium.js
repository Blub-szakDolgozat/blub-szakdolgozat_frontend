import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Akvarium = () => {
    const [viziLenyek, setViziLenyek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // API kérés az aktuális felhasználó vizi lényeinek lekérésére
        axios.get('/api/user-lenyei', { withCredentials: true })  // withCredentials, ha a cookie-kat is küldeni akarjuk
            .then(response => {
                setViziLenyek(response.data); // Az adatok tárolása a state-ben
                setLoading(false);
            })
            .catch(err => {
                setError(err.message); // Hiba kezelése
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Az Ön Akváriuma</h1>
            {viziLenyek.length === 0 ? (
                <p>Még nincs vizi lény az akváriumban!</p>
            ) : (
                <div className="vizi-lenyek">
                    {viziLenyek.map(viziLeny => (
                        <div className="vizi-leny" key={viziLeny.nev}>
                            <h2>{viziLeny.nev}</h2>
                            <p><strong>Fajta:</strong> {viziLeny.fajta}</p>
                            <p><strong>Ritkaság:</strong> {viziLeny.ritkasagi_szint}</p>
                            <p>{viziLeny.leiras}</p>
                            {viziLeny.kep && <img src={`/storage/${viziLeny.kep}`} alt={viziLeny.nev} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Akvarium;
