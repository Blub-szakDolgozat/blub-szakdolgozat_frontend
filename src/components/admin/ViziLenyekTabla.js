import React, { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiContext";
import { Button } from "react-bootstrap";

export default function Doga(props) {
  const { szakdogaLista, setSzakdogaLista, putAdat, deleteAdat } =
    useContext(ApiContext);

  const torles = async (id) => {
    try {
      await deleteAdat("/api/vizilenyek-torol", id);
      const frissSzakdogaLista = szakdogaLista.filter((item) => item.id !== id);
      setSzakdogaLista(frissSzakdogaLista);
    } catch (err) {
      console.error("Hiba történt a törlés során:", err);
    }
  };
  const [szerkesztes, setSzerkeszt] = useState(false);
  const [szerkesztSzakdoga, setSzerkesztSzakdoga] = useState(props.adat);
  const szerkesztGomb = () => {
    setSzerkeszt(true);
  };
  const szerkesztesMentese = async () => {
    try {
      await putAdat("/api/szakdogak", szerkesztSzakdoga.id, szerkesztSzakdoga);
      const szerkesztettLista = szakdogaLista.map((item) =>
        item.id === szerkesztSzakdoga.id ? szerkesztSzakdoga : item
      );
      setSzakdogaLista(szerkesztettLista);
      setSzerkeszt(false);
    } catch (err) {
      console.error("Hiba történt módosítás mentésekor", err);
    }
  };
  const szerkesztesValtoztatasa = (elem) => {
    const { name, value } = elem.target;
    setSzerkesztSzakdoga((elozo) => ({
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
            name="szakdoga_neve"
            value={szerkesztSzakdoga.szakdoga_neve}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.szakdoga_neve
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="githublink"
            value={szerkesztSzakdoga.githublink}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.githublink
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="oldallink"
            value={szerkesztSzakdoga.oldallink}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.oldallink
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="tagokneve"
            value={szerkesztSzakdoga.tagokneve}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.tagokneve
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
        <Button variant="outline-danger" onClick={() => torles(props.adat.id)}>
          ❌
        </Button>
      </td>
    </tr>
  );
}