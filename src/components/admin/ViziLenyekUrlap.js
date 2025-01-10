import React, { useState } from "react";
import useAdminContext from "../../contexts/AdminContext";

export default function ViziLenyekUrlap() {
  const { postAdat, errors } = useAdminContext();
  const [nev, setNev] = useState("");
  const [fajta, setFajta] = useState("");
  const [ritkasagi_szint, setRitkasagiszint] = useState("");
  const [leiras, setLeiras] = useState("");
  const [file, setFile] = useState(null);
  

  function kuld(event) {
    event.preventDefault();
    let adat = {
        nev: nev,
      fajta: fajta,
      ritkasagi_szint:ritkasagi_szint,
      leiras: leiras,
      kep: file,
    };
    console.log(adat);

    postAdat(adat, "/vizilenyekadd");
  }

  return (
    <div className="container">
      <form onSubmit={kuld}>

        <div className="mb-3">
          <label htmlFor="nev" className="form-label">
            A vízi lény neve:
          </label>
          <input
            type="text"
            className="form-control"
            id="nev"
            onChange={(event) => {
              setNev(event.target.value); 
            }}
            placeholder="a vizi lény neve"
          />
        </div>
        <div>
          {errors.nev && (
            <span className="text-danger">{errors.nev[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="fajta" className="form-label">
          A vízi lény fajtája:
          </label>
          <input
            type="text"
            className="form-control"
            id="fajta"
            onChange={(event) => {
              setFajta(event.target.value); 
            }}
            placeholder="a vízi lény fajtája"
          />
        </div>
        <div>
          {errors.fajta && (
            <span className="text-danger">{errors.fajta[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="ritkasagi_szint" className="form-label">
          A vízi lény ritkasági szintje:
          </label>
          <input
            type="text"
            className="form-control"
            id="ritkasagi_szint"
            onChange={(event) => {
              setRitkasagiszint(event.target.value); 
            }}
            placeholder="⭐"
          />
        </div>
        <div>
          {errors.ritkasagi_szint && (
            <span className="text-danger">{errors.ritkasagi_szint[0]}</span>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="leiras" className="form-label">
            A vízi lény leírása:
          </label>
          <input
            type="text"
            className="form-control"
            id="leiras"
            onChange={(event) => {
              setLeiras(event.target.value); 
            }}
            placeholder="a vízi lény leírása"
          />
        </div>
        <div>
          {errors.leiras && (
            <span className="text-danger">{errors.leiras[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
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
          {errors.kep && <span className="text-danger">{errors.kep[0]}</span>}
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          id="submit"
          value="Küld"
        />
      </form>
    </div>
  );
}