import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { AdminContext } from "../../contexts/AdminContext";

export default function CikkekTablazatSor(props) {
    const { cikkLista, setCikkLista, putAdat, deleteAdat } =
    useContext(AdminContext);
 
  const torles = async (id) => {
    try {
      await deleteAdat("/api/cikk-torol", id);
      const frissVideokLista = cikkLista.filter((item) => item.cikk_id !== id);
      setCikkLista(frissVideokLista);
    } catch (err) {
      console.error("Hiba történt a törlés során:", err);
    }
  };
  const [szerkesztes, setSzerkeszt] = useState(false);
  const [szerkesztCikk, setSzerkesztCikk] = useState(props.adat);
  const szerkesztGomb = () => {
    setSzerkeszt(true);
  };
  const szerkesztesMentese = async () => {
    try {
      await putAdat("/api/cikkek", szerkesztCikk.cikk_id, szerkesztCikk);
      const szerkesztettLista = cikkLista.map((item) =>
        item.cikk_id === szerkesztCikk.cikk_id ? szerkesztCikk : item
      );
      setCikkLista(szerkesztettLista);
      setSzerkeszt(false);
    } catch (err) {
      console.error("Hiba történt módosítás mentésekor", err);
    }
  };
  const szerkesztesValtoztatasa = (elem) => {
    const { name, value } = elem.target;
    setSzerkesztCikk((elozo) => ({
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
            name="kepek"
            value={szerkesztCikk.kepek}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.kepek
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="cim"
            value={szerkesztCikk.cim}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.cim
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="leiras"
            value={szerkesztCikk.leiras}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.leiras
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="date"
            name="publikalva"
            value={szerkesztCikk.publikalva}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.publikalva
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
        <Button variant="outline-danger" onClick={() => torles(props.adat.cikk_id)}>
          ❌
        </Button>
      </td>
    </tr>
  );
}
