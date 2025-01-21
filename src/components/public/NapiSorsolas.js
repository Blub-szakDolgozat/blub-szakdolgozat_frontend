import React, { useState } from 'react';
import './Sorsolas.css';

export default function NapiSorsolas() {
  const [nyeremeny, setNyeremeny] = useState(null);
//Alap szerkezet
  const handleSorsolas = () => {
    const nyeremenyek = ['Autó', 'Laptop', 'Társasjáték', 'Pénz'];
    const randomNyeremeny = nyeremenyek[Math.floor(Math.random() * nyeremenyek.length)];
    setNyeremeny(randomNyeremeny);
  };
  return (
    <div className="sorsolas-container">
      <h2>Szoveg</h2>
      <p>Szoveg</p>

      <input
        type="submit"
        className="btn btn-primary"
        id="submit"
        value="Sorsolás"
        onClick={handleSorsolas}
      />

      <p>Nyereményed:</p>
      {nyeremeny && (
        <div className="nyeremeny-kartya">
          <h3>Nyertél egy {nyeremeny}!</h3>
        </div>
      )}
    </div>
  );
}
