import React, { useContext, useState } from 'react'
import { AdminContext } from '../../contexts/AdminContext';
import { Button } from 'react-bootstrap';

export default function EsemenyTablaSor(props) {
    const { esemenyekLista, setEsemenyekLista, putAdat, deleteAdat } =
    useContext(AdminContext);
 
  const torles = async (id) => {
    try {
      await deleteAdat("/api/esemeny-torol", id);
      const frissEsemenyekLista = esemenyekLista.filter((item) => item.esemeny_id !== id);
      setEsemenyekLista(frissEsemenyekLista);
    } catch (err) {
      console.error("Hiba történt a törlés során:", err);
    }
  };
  const [szerkesztes, setSzerkeszt] = useState(false);
  const [szerkesztEsemeny, setSzerkesztEsemeny] = useState(props.adat);
  const szerkesztGomb = () => {
    setSzerkeszt(true);
  };
  const szerkesztesMentese = async () => {
    try {
      await putAdat("/api/esemenyek", szerkesztEsemeny.esemeny_id, szerkesztEsemeny);
      const szerkesztettLista = esemenyekLista.map((item) =>
        item.esemeny_id === szerkesztEsemeny.esemeny_id ? szerkesztEsemeny : item
      );
      setEsemenyekLista(szerkesztettLista);
      setSzerkeszt(false);
    } catch (err) {
      console.error("Hiba történt módosítás mentésekor", err);
    }
  };
  const szerkesztesValtoztatasa = (elem) => {
    const { name, value } = elem.target;
    setSzerkesztEsemeny((elozo) => ({
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
            name="esemeny_neve"
            value={szerkesztEsemeny.esemeny_neve}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.esemeny_neve
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="leiras"
            value={szerkesztEsemeny.leiras}
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
            name="datum"
            value={szerkesztEsemeny.datum}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.datum
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="helyszin"
            value={szerkesztEsemeny.helyszin}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.helyszin
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="number"
            name="letszam"
            value={szerkesztEsemeny.letszam}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.letszam
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
        <Button variant="outline-danger" onClick={() => torles(props.adat.video_id)}>
          ❌
        </Button>
      </td>
    </tr>
  );
}
