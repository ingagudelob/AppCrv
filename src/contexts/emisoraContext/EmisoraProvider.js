// Este componente va a ser compartido en toda la app q solicite este contexto

import axios from "axios";
import { useEffect, useState } from "react";
import EmisorasContext from "./EmisoraContext";
import ApiEmisoras from "../../apis/ApiEmisoras";

// En este componente retornamos el contexto con su provider: <EmisorasContext.Provider value={}></EmisorasContext.Provider>
// Al context con elprivider se le pasa el {children}

const EmisoraProvider = ({ children }) => {
  /*
  const [dataEmisoras, setDataEmisoras] = useState([]);

  const UrlEmisoras = "http://localhost:9000/apiscrv/emisoras/listEmisoras";

  const getAllEmisoras = async () => {
    try {
      const { data } = await axios.get(UrlEmisoras);
      setDataEmisoras(data);
    } catch (err) {
      console.error(err);
      setDataEmisoras([]);
    }
  };

  useEffect(() => {
    getAllEmisoras().catch(null);
  }, []);

  */
  const [emisora, setEmisora] = useState([]);

  const getAllEmisoras = async () =>{

    

    try {
      const emisorasResult = await ApiEmisoras ({
        url: "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200",
        
      }); 
      setEmisora(emisorasResult.results);
    } catch (error) {
      Promise.reject(error);
      setEmisora([]);
    }
  };

  // Como quiero compartir el metodo y  el resultado los paso en el value del privider

  return (
    <EmisorasContext.Provider value={{getAllEmisoras, emisora}}>
      {children}
    </EmisorasContext.Provider>
  );
};

export default EmisoraProvider;
