import React, { useState, useEffect } from 'react';
import { myAxios } from '../../contexts/MyAxios';
import './public.css';

export default function Esemeny(props) {
    const eventId = props.obj?.esemeny_id;
    
    // Ellenőrizzük, hogy az eseményre már feliratkozott-e a felhasználó
    const [isFeliratkozva, setIsFeliratkozva] = useState(
        localStorage.getItem(`feliratkozva_${eventId}`) === "true"
    );

    useEffect(() => {
        // Ha van esemény ID és a localStorage már tartalmazza, frissítjük az állapotot
        if (eventId) {
            setIsFeliratkozva(localStorage.getItem(`feliratkozva_${eventId}`) === "");
        }
    }, [eventId]);

    const handleReszvetel = async () => {
        console.log("Event ID:", eventId);  // Ellenőrizzük, hogy mi az eventId értéke
    
        // Ellenőrizzük, hogy az esemény ID megfelelő formátumban van
        if (!eventId || (typeof eventId !== 'number' && typeof eventId !== 'string')) {
            console.error("Hiba: Az esemény ID-je nem megfelelő formátumban van", eventId);
            return;  // Ha nem megfelelő formátumban van, akkor leállítjuk a függvényt
        }
    
        // Ha eventId szám típusú, nem szükséges konvertálni
        const formattedEventId = typeof eventId === 'string' ? parseInt(eventId, 10) : eventId;
    
        if (props.obj.letszam > 0 && !isFeliratkozva) {
            try {
                // POST kérés elküldése a megfelelő típusú eventId-vel
                const response = await myAxios.post(`/api/esemeny/feliratkozas`, { esemeny_id: formattedEventId });
    
                if (response.status === 200) {
                    props.obj.letszam -= 1;
                    setIsFeliratkozva(true);
                    localStorage.setItem(`feliratkozva_${formattedEventId}`, "true");
                }
            } catch (error) {
                console.error("Hiba történt a feliratkozás során!", error);
                alert("Hiba történt a feliratkozás során. Kérjük, próbáld újra!");
            }
        } else if (isFeliratkozva) {
            try {
                // Leiratkozás DELETE kérése
                const response = await myAxios.delete(`/api/esemeny/${formattedEventId}/feliratkozas`);
    
                if (response.status === 200) {
                    // Frissítjük a létszámot és az állapotot
                    props.obj.letszam += 1;
                    setIsFeliratkozva(false);
                    localStorage.setItem(`feliratkozva_${formattedEventId}`, "false");
                }
            } catch (error) {
                console.error("Hiba történt a leiratkozás során!", error);
                alert("Hiba történt a leiratkozás során. Kérjük, próbáld újra!");
            }
        }
    };
    
    
      
    return (
        <div className="esemeny-container row">
            <div className='datum col-12 col-md-2'>
                <p><strong>{props.obj?.datum || "Nincs dátum"}</strong></p>
                <p><strong>Helyszín:</strong> {props.obj?.helyszin || "Nincs helyszín"}</p>
                <p><strong>Résztvevők száma:</strong> {props.obj?.letszam || "Nincs adat"} fő</p>
            </div>
            <div className="esemeny-content col-12 col-md-10">
                <h2>{props.obj?.esemeny_neve || "Nincs esemény neve"}</h2>
                <p>{props.obj?.leiras ? props.obj.leiras : "Nincs leírás"}</p> 

                {/* Feliratkozás gomb - stílusosan megkülönböztetve */}
                <button 
                    className={`feliratkozas ${isFeliratkozva ? "disabled" : ""}`} 
                    onClick={handleReszvetel} 
                    disabled={isFeliratkozva}
                >
                    {isFeliratkozva ? "✔️ Feliratkozva" : "Feliratkozás"}
                </button>
            </div>
        </div>
    );
}
