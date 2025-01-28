import React, { useContext } from 'react'
import { AdminContext } from '../../contexts/AdminContext';

export default function EsemenyTablaSor() {
    const { esemenyekLista, setEsemenyekLista, putAdat, deleteAdat } =
    useContext(AdminContext);
 
  const torles = async (id) => {
    try {
      await deleteAdat("/api/esemeny-torol", id);
      const frissEsemenyekLista = videokLista.filter((item) => item.video_id !== id);
      setVideokLista(frissEsemenyekLista);
    } catch (err) {
      console.error("Hiba történt a törlés során:", err);
    }
  };
  const [szerkesztes, setSzerkeszt] = useState(false);
  const [szerkesztVideo, setSzerkesztVideo] = useState(props.adat);
  const szerkesztGomb = () => {
    setSzerkeszt(true);
  };
  const szerkesztesMentese = async () => {
    try {
      await putAdat("/api/videok", szerkesztVideo.video_id, szerkesztVideo);
      const szerkesztettLista = videokLista.map((item) =>
        item.video_id === szerkesztVideo.video_id ? szerkesztVideo : item
      );
      setVideokLista(szerkesztettLista);
      setSzerkeszt(false);
    } catch (err) {
      console.error("Hiba történt módosítás mentésekor", err);
    }
  };
  const szerkesztesValtoztatasa = (elem) => {
    const { name, value } = elem.target;
    setSzerkesztVideo((elozo) => ({
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
            name="nyitokep"
            value={szerkesztVideo.nyitokep}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.nyitokep
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="text"
            name="cim"
            value={szerkesztVideo.cim}
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
            name="link"
            value={szerkesztVideo.link}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.link
        )}
      </td>
      <td>
        {szerkesztes ? (
          <input
            type="number"
            name="hossz"
            value={szerkesztVideo.hossz}
            onChange={szerkesztesValtoztatasa}
          />
        ) : (
          props.adat.hossz
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
