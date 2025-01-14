import { myAxios } from "./MyAxios";
import { createContext, useContext, useEffect, useState } from "react";

const FileContext = createContext();
export const FileProvider = ({ children }) => {
  const [kepekLista, setKepekLista] = useState([]);
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
      const response = await myAxios.post(vegpont, adat, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setKepekLista(response.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  useEffect(() => {
    getLista("/api/vizilenyek", setKepekLista);
  }, []);

  return (
    <FileContext.Provider value={{ kepekLista, postAdat, errors }}>
      {children}
    </FileContext.Provider>
  );
};

export default function useFileContext() {
  return useContext(FileContext);
}