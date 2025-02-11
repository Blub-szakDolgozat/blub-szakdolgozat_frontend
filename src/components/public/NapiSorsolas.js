import React, { useState } from "react";

export default function NapiSorsolas() {
  const [nyeremeny, setNyeremeny] = useState(null);
  const [hiba, setHiba] = useState("");

  const handleSorsolas = async () => {
    setHiba("");

    try {
      // 1. Véletlenszerű vízi lény lekérése a backendből
      const response = await fetch("/api/random-vizi-leny", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error("Nem sikerült lekérni a vízi lényt.");
      }

      const viziLeny = await response.json();
      setNyeremeny(viziLeny);

      // 2. Vízi lény hozzáadása az akváriumba
      const addResponse = await fetch("/api/hozzaad-akvariumhoz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ vizi_leny_id: viziLeny.vizi_leny_id }),
      });

      if (!addResponse.ok) {
        const errMessage = await addResponse.json();
        throw new Error(errMessage.message || "Nem sikerült hozzáadni az akváriumhoz.");
      }
    } catch (error) {
      setHiba(error.message);
    }
  };

  return (
    <div className="sorsolas-container">
      <h2>Napi Sorsolás</h2>
      <p>Kattints a gombra, hogy sorsolj egy vízi lényt az akváriumodba!</p>

      <button className="btn btn-primary" onClick={handleSorsolas}>
        Sorsolás
      </button>

      {hiba && <p className="error">{hiba}</p>}

      {nyeremeny && (
        <div className="nyeremeny-kartya">
          <h3>Nyertél egy {nyeremeny.nev}!</h3>
          <p>Fajta: {nyeremeny.fajta}</p>
          <p>Ritkasági szint: {nyeremeny.ritkasagi_szint}</p>
        </div>
      )}
    </div>
  );
}
