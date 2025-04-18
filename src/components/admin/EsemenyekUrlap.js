import React, { useContext, useEffect, useState } from "react";
import useAdminContext, { AdminContext } from "../../contexts/AdminContext";
import EsemenyTablazat from "./EsemenyTablazat";
import './Admin.css';

export default function EsemenyekUrlap() {
  // UseState hook használata a komponensek állapotának változtatására
  const { esemenyekLista } = useContext(AdminContext);
  const { postAdat, errors } = useAdminContext();
  const [esemeny_neve, setEsemenyNeve] = useState("");
  const [leiras, setLeiras] = useState("");
  const [datum, setDatum] = useState("");
  const [helyszin, setHelyszin] = useState("");
  const [letszam, setLetszam] = useState("");
  const [minDate, setMinDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // UseEffect hook arra a beállításra, hogy az esemény dátumát az adott napon csak a holnapi dátumtól lehesssen beállítani 
  useEffect(() => {
    const holnap = new Date();
    holnap.setDate(holnap.getDate() + 1);
    const holnapiDatum = holnap.toISOString().split("T")[0];
    setMinDate(holnapiDatum);
  }, []);

  // A kuld függvény az űrlap adatainak elküldésére szolgál
  function kuld(event) {
    event.preventDefault();
    let adat = {
      esemeny_neve: esemeny_neve,
      leiras: leiras,
      datum: datum,
      helyszin: helyszin,
      letszam: letszam,
    };
    console.log(adat);
    // itt hívom meg a postAdat nevű függvényt, amit a AdminContext kontextben írtam meg. 
    // A postAdat egy aszinkron funkció, melynek köszönhetően küldjük el az adatokat az API végpontra egy post kéréssel. Két paramétere van, az egyik az adat, másik az URL, ahová az adatokat küldük a post kéréssel. 
    // Ezt a useAdminContext egyéni hook-kal hívom meg a küld függvényben. 
    postAdat(adat, "/api/esemeny-add");
  }

  // Szűrés a keresett szöveg alapján
  const filteredEvents = esemenyekLista.filter((esemeny) => {
    return (
      esemeny.esemeny_neve.toLowerCase().includes(searchTerm.toLowerCase()) ||
      esemeny.helyszin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      esemeny.leiras.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  });

  // Az űrlap komponens visszatérési részében kialakítom a form-ot, ahol onSubmit eseménykezelővel meghívom a kuld függvényt. Tehát az adatokat elküldi, amikor a Küldés gombra kattintunk.  
  return (
    <div className="container">
      <h1>Események</h1>
      
      {/* Szűrő input hozzáadása */}
      <div className="mt-4 szures">
        <p className="text">Szűrés:</p>
        <input
          type="text"
          className="form-control"
          placeholder="Keresés esemény név és leírás vagy helyszín alapján"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <form onSubmit={kuld}>
        <div className="mb-3">
          <label htmlFor="esemeny_neve" className="form-label">
            Az esemény neve:
          </label>
          <input
            type="text"
            className="form-control"
            id="esemeny_neve"
            onChange={(event) => {
              setEsemenyNeve(event.target.value);
            }}
            placeholder="esemény neve"
          />
        </div>
        <div>
          {errors.esemeny_neve && (
            <span className="text-danger">{errors.esemeny_neve[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="datum" className="form-label">
            Az esemény dátuma:
          </label>
          <input
            type="date"
            className="form-control"
            id="datum"
            onChange={(event) => {
              setDatum(event.target.value);
            }}
            placeholder="esemény dátuma"
            min={minDate}
          />
        </div>
        <div>
          {errors.datum && (
            <span className="text-danger">{errors.datum[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="leiras" className="form-label">
            Az esemény leírása:
          </label>
          <input
            type="text"
            className="form-control"
            id="leiras"
            onChange={(event) => {
              setLeiras(event.target.value);
            }}
            placeholder="esemény leírása"
          />
        </div>
        <div>
          {errors.leiras && (
            <span className="text-danger">{errors.leiras[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="helyszin" className="form-label">
            Az esemény helyszíne:
          </label>
          <input
            type="text"
            className="form-control"
            id="helyszin"
            onChange={(event) => {
              setHelyszin(event.target.value);
            }}
            placeholder="esemény helyszíne"
          />
        </div>
        <div>
          {errors.helyszin && (
            <span className="text-danger">{errors.helyszin[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="letszam" className="form-label">
            Az esemény létszáma:
          </label>
          <input
            type="number"
            min={0}
            max={Number.MAX_VALUE}
            className="form-control"
            id="letszam"
            onChange={(event) => {
              setLetszam(event.target.value);
            }}
            placeholder="esemény létszáma"
          />
        </div>
        <div>
          {errors.letszam && (
            <span className="text-danger">{errors.letszam[0]}</span>
          )}
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          id="submit"
          value="Küld"
        />
      </form>


      {/* Események listázása szűrt formában */}
      <EsemenyTablazat esemenyekLista={filteredEvents} />
    </div>
  );
}
