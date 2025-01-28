import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { AdminContext } from "../../contexts/AdminContext";
 
export default function ViziLenyekTabla(props) {
  const { kepekLista, setKepekLista, putAdat, deleteAdat } =
    useContext(AdminContext);
 
  const torles = async (id) => {
    try {
      await deleteAdat("/api/vizilenyek-torol", id);
      const frissKepekLista = kepekLista.filter((item) => item.vizi_leny_id !== id);
      setKepekLista(frissKepekLista);
    } catch (err) {
      console.error("Hiba történt a törlés során:", err);
    }
  };
  const [szerkesztes, setSzerkeszt] = useState(false);
  const [szerkesztVizileny, setSzerkesztVizileny] = useState(props.adat);
  const szerkesztGomb = () => {
    setSzerkeszt(true);
  };
  const szerkesztesMentese = async () => {
    try {
      await putAdat("/api/vizilenyek", szerkesztVizileny.vizi_leny_id, szerkesztVizileny);
      const szerkesztettLista = kepekLista.map((item) =>
        item.vizi_leny_id === szerkesztVizileny.vizi_leny_id ? szerkesztVizileny : item
      );
      setKepekLista(szerkesztettLista);
      setSzerkeszt(false);
    } catch (err) {
      console.error("Hiba történt módosítás mentésekor", err);
    }
  };
  const szerkesztesValtoztatasa = (elem) => {
    const { name, value } = elem.target;
    setSzerkesztVizileny((elozo) => ({
      ...elozo,
      [name]: value,
    }));
  };
  return (
    <tr>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="kep"
            value={szerkesztVizileny.kep}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.kep
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="nev"
            value={szerkesztVizileny.nev}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.nev
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="fajta"
            value={szerkesztVizileny.fajta}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.fajta
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="ritkasagi_szint"
            value={szerkesztVizileny.ritkasagi_szint}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.ritkasagi_szint
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="textarea"
            name="leiras"
            value={szerkesztVizileny.leiras}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.leiras
        )}
      </td>
      <td>
        {szerkesztes ? (
          <Button variant="outline-primary" onClick={szerkesztesMentese}>
            Mentés
          </Button>
        ) : (
          <Button variant="outline-primary" onClick={szerkesztGomb}>
            ✏️
          </Button>
        )}
      </td>
      <td>
        <Button variant="outline-danger" onClick={() => torles(props.adat.vizi_leny_id)}>
          ❌
        </Button>
      </td>
    </tr>
  );
}