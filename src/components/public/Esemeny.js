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
        if (!eventId) {
            console.error("Hiba: Az esemény ID-je hiányzik!", props.obj);
            return;
        }
    
        if (props.obj.letszam > 0 && !isFeliratkozva) {
            try {
                // Feliratkozás POST kérése
                const response = await myAxios.post(`/api/esemeny/${eventId}/feliratkozas`);
    
                if (response.status === 200) {
                    // Frissítjük a létszámot és az állapotot
                    props.obj.letszam -= 1;
                    setIsFeliratkozva(true);
                    localStorage.setItem(`feliratkozva_${eventId}`, "true");
                }
            } catch (error) {
                console.error("Hiba történt a feliratkozás során!", error);
                alert("Hiba történt a feliratkozás során. Kérjük, próbáld újra!");
            }
        } else if (isFeliratkozva) {
            try {
                // Leiratkozás DELETE kérése
                const response = await myAxios.delete(`/api/esemeny/${eventId}/feliratkozas`);
    
                if (response.status === 200) {
                    // Frissítjük a létszámot és az állapotot
                    props.obj.letszam += 1;
                    setIsFeliratkozva(false);
                    localStorage.setItem(`feliratkozva_${eventId}`, "false");
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
