import React, { useState } from "react";

export default function NapiSorsolas() {
  const [nyeremeny, setNyeremeny] = useState(null);
  const [hiba, setHiba] = useState("");

  const handleSorsolas = async () => {
    setHiba("");
  
    try {
      // 1. CSRF token lekérése
      const csrfResponse = await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // FONTOS! Sütikhez szükséges
      });
  
      if (!csrfResponse.ok) {
        throw new Error("CSRF token nem érhető el.");
      }
  
      // 2. Véletlenszerű vízi lény lekérése
      const response = await fetch("http://localhost:8000/api/random-vizi-leny", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include", // Ez biztosítja a süti használatát
      });
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        throw new Error(`Nem JSON válasz érkezett: ${errorText}`);
      }
  
      const viziLeny = await response.json();
      setNyeremeny(viziLeny);
  
      // 3. Vízi lény hozzáadása az akváriumhoz
      const addResponse = await fetch("http://localhost:8000/api/akvarium/sorsol-hozzaad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // A CSRF token most a sütikből jön, nem kell külön beállítani
        },
        credentials: "include", // Sütik engedélyezése
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
