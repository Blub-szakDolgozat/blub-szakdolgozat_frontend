import React, { useState } from "react";
import { myAxios } from "../../contexts/MyAxios"; // Axios példány importálása
export default function NapiSorsolas() {
  const [nyeremeny, setNyeremeny] = useState(null);
  const [hiba, setHiba] = useState("");
  const [marSorsolt, setMarSorsolt] = useState(false); // Figyeljük, hogy volt-e már sorsolás

  const handleSorsolas = async () => {
    if (marSorsolt) {
      setHiba("Már sorsoltál ma! Holnap újra próbálhatod.");
      return;
    }

    setHiba("");
    setNyeremeny(null);

    try {
      // 1. CSRF token frissítése
      await myAxios.get("/sanctum/csrf-cookie");

      // 2. Véletlenszerű vízi lény lekérése
      const { data } = await myAxios.get("/api/random-vizi-leny");
      const viziLeny = data?.data; // API válaszának ellenőrzése

      if (!viziLeny) {
        throw new Error("Nem sikerült vízi lényt lekérni.");
      }

      setNyeremeny(viziLeny);

      // 3. Vízi lény hozzáadása az akváriumhoz
      await myAxios.post("/api/akvarium/sorsol-hozzaad", {
        vizi_leny_id: viziLeny.vizi_leny_id,
      });

      setMarSorsolt(true); // Beállítjuk, hogy aznap már volt sorsolás

    } catch (error) {
      if (error.response?.status === 409) {
        setMarSorsolt(true); // Ha már sorsolt, állítsuk be, hogy ne lehessen újra
        setHiba("Már kaptál vízi lényt ma! Holnap újra próbálhatod.");
      } else {
        setHiba(error.response?.data?.message || "Hiba történt a sorsolás során.");
      }
    }
  };

  return (
    <div className="sorsolas-container">
      <h2>Napi Sorsolás</h2>
      <p>Kattints a gombra, hogy sorsolj egy vízi lényt az akváriumodba!</p>

      <button className="btn btn-primary" onClick={handleSorsolas} disabled={marSorsolt}>
        {marSorsolt ? "Holnap újra próbálhatod!" : "Sorsolás"}
      </button>

      {hiba && <p className="error">{hiba}</p>}

      {nyeremeny && (
        <div className="nyeremeny-kartya">
          <h3>Nyertél egy {nyeremeny.nev}!</h3>
          <p>Fajta: {nyeremeny.fajta || "Nincs adat"}</p>
          <p>Ritkasági szint: {nyeremeny.ritkasagi_szint || "Nincs adat"}</p>
        </div>
      )}
    </div>
  );
}