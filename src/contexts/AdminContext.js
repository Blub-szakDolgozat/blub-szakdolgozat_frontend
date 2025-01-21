import { myAxios } from "./MyAxios";
import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();
export const FileProvider = ({ children }) => {
  const [kepekLista, setKepekLista] = useState([]);
  const [videokLista, setVideokLista]=useState([]);

  const [errors, setErrors] = useState({});

  const getLista = async (vegpont, callBack) => {
    try{
        const {data} =await myAxios.get(vegpont);
        callBack(data);
    }catch(err){
        console.log("Hiba történt az adatok lekérésekor.")
    }finally{

    }
  };

  const postAdat = async ({ ...adat }, vegpont) => {
    try {
      await myAxios.post(vegpont, adat, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          console.log(resp);
          setKepekLista(resp.data);
          setVideokLista(resp.data);
        });
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  useEffect(() => {
    getLista("/api/vizilenyek", setKepekLista);
    getLista("/api/videok", setVideokLista)
  }, []);

  return (
    <AdminContext.Provider value={{ kepekLista, postAdat, errors, videokLista }}>
      {children}
    </AdminContext.Provider>
  );
};

export default function useAdminContext() {
  return useContext(AdminContext);
}