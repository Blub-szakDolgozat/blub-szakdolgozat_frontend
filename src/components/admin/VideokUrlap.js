import React, { useContext, useState } from "react";
import useAdminContext, { AdminContext } from "../../contexts/AdminContext";
import VideoTablazat from "./VideoTablazat";
import './Admin.css';

export default function VideokUrlap() {
  const { videokLista } = useContext(AdminContext);
  const { postAdat, errors } = useAdminContext();
  const [cim, setCim] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [hossz, setHossz] = useState("");

  function kuld(event) {
    event.preventDefault();
    let adat = {
      cim: cim,
      link: link,
      hossz: hossz,
      nyitokep: file,
    };
    console.log(adat);

    postAdat(adat, "/api/video-add");
  }

  return (
    <div className="container">
      <h1>Videók</h1>
      <form onSubmit={kuld}>
        <div className="mb-3">
          <label htmlFor="cim" className="form-label">
            A videó címe:
          </label>
          <input
            type="text"
            className="form-control"
            id="cim"
            onChange={(event) => {
              setCim(event.target.value);
            }}
            placeholder="videó címe"
          />
        </div>
        <div>
          {errors.cim && <span className="text-danger">{errors.cim[0]}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="link" className="form-label">
            A videó linkje:
          </label>
          <input
            type="url"
            className="form-control"
            id="link"
            onChange={(event) => {
              setLink(event.target.value);
            }}
            placeholder="videó linkje"
          />
        </div>
        <div>
          {errors.link && <span className="text-danger">{errors.link[0]}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="nyitokep" className="form-label">
            Válassz fájlt!
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="form-control"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
            id="nyitokep"
            placeholder="Válasszon fájlt..."
          />
        </div>
        <div>
          {errors.nyitokep && (
            <span className="text-danger">{errors.nyitokep[0]}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="hossz" className="form-label">
            A videó hossza:
          </label>
          <input
            type="number"
            min={1}
            max={Number.MAX_VALUE}
            className="form-control"
            id="hossz"
            onChange={(event) => {
              setHossz(event.target.value);
            }}
            placeholder="videó hossza"
          />
        </div>
        <div>
          {errors.hossz && (
            <span className="text-danger">{errors.hossz[0]}</span>
          )}
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          id="submit"
          value="Küld"
        />
      </form>
      <VideoTablazat videokLista={videokLista}/>
    </div>
  );
}
