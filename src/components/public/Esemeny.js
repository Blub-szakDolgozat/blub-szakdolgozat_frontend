import React from 'react'
import { myAxios } from '../../contexts/MyAxios';

export default function Esemeny(props) {
    console.log("Esemény adatai:", props);

    const handleReszvetel = async () => {
        if (props.obj.letszam > 0) {
            try {
                const ujLetszam = props.obj.letszam - 1;
                await myAxios.put(`/api/esemenyek/${props.obj.id}`, { letszam: ujLetszam });

                // Frissítsük az események listáját
                props.obj.letszam = ujLetszam;
            } catch (error) {
                console.error("Hiba történt a résztvevők csökkentésekor!", error);
            }
        }
    };


    return (
        <div className="esemeny-container">
            <div className="esemeny-content">
            <h2>{props.obj?.esemeny_neve || "Nincs esemény neve"}</h2>
            <p>{props.obj?.leiras ? props.obj.leiras  : "Nincs leírás"}</p> 
                <p><strong>Időpont:</strong> {props.obj?.datum || "Nincs dátum"}</p>
                <p><strong>Helyszín:</strong> {props.obj?.helyszin || "Nincs helyszín"}</p>
                <p><strong>Résztvevők száma:</strong> {props.obj?.letszam || "Nincs adat"} fő</p>
                <button className="btn-primary" onClick={handleReszvetel}>Feliratkozás</button>
            </div>
        </div>
    )
}
