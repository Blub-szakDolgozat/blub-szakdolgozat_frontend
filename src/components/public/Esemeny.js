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
                const ujLetszam = props.obj.letszam - 1;
                await myAxios.put(`/api/esemenyek/${eventId}`, { letszam: ujLetszam });

                props.obj.letszam = ujLetszam;
                setIsFeliratkozva(true);
                localStorage.setItem(`feliratkozva_${eventId}`, "true"); // Állapot mentése

            } catch (error) {
                console.error("Hiba történt a résztvevők csökkentésekor!", error);
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
