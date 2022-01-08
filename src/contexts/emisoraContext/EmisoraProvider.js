import axios from "axios";
import { useEffect, useState } from "react";
import EmisorasContext from "./EmisoraContext";

const EmisoraProvider = ({ children }) => {
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

  return (
    <EmisorasContext.Provider value={dataEmisoras}>
      {children}
    </EmisorasContext.Provider>
  );
};

export default EmisoraProvider;
