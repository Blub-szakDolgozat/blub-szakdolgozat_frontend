import React, { useState } from "react";
import useAdminContext from "../../contexts/AdminContext";
import CikkekTablazat from "./CikkekTablazat";

export default function CikkekUrlap() {
  const { postAdat, errors,cikkLista } = useAdminContext();
  const [cim, setCim] = useState("");
  const [publikalva, setPublikalva] = useState("");
  const [leiras, setLeiras] = useState("");
  const [file, setFile] = useState(null);

  function kuld(event) {
    event.preventDefault();
    let adat = {
      cim: cim,
      kepek: file,
      leiras: leiras,
      publikalva:publikalva,
    };
    console.log(adat);
    postAdat(adat, "/api/cikk-add");
  }

  return (
    <div className="container">
      <form onSubmit={kuld}>
        <div className="mb-3">
          <label htmlFor="cim" className="form-label">
            A cikk címe:
          </label>
          <input
            type="text"
            className="form-control"
            id="cim"
            onChange={(event) => {
              setCim(event.target.value);
            }}
            placeholder="cikk címe"
          />
        </div>
        <div>
          {errors.cim && <span className="text-danger">{errors.cim[0]}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="leiras" className="form-label">
            A cikk leírása
          </label>
          <input
            type="text"
            className="form-control"
            id="leiras"
            onChange={(event) => {
              setLeiras(event.target.value);
            }}
            placeholder="a cikk leírása"
          />
        </div>
        <div>
          {errors.leiras && (
            <span className="text-danger">{errors.leiras[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="kepek" className="form-label">
            Válassz fájlt!
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="form-control"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
            id="fileNev"
            placeholder="Válasszon fájlt..."
          />
        </div>
        <div>
          {errors.kepek && (
            <span className="text-danger">{errors.kepek[0]}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="datum" className="form-label">
            Publikálva:
          </label>
          <input
            type="date"
            className="form-control"
            id="datum"
            onChange={(event) => {
              setPublikalva(event.target.value);
            }}
            placeholder="esemény dátuma"
          />
        </div>
        <div>
          {errors.publikalva && (
            <span className="text-danger">{errors.publikalva[0]}</span>
          )}
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          id="submit"
          value="Küld"
        />
      </form>
      <CikkekTablazat cikkLista={cikkLista} />
    </div>
  );
}
