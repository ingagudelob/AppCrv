// Para poder suscribirme al contexto debo importar el hook de react, useContext

import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import EmisorasContext from "../../../contexts/emisoraContext/EmisoraContext";
import ListEmisoras from "./ListEmisoras";

const InformesPage = ({ url, name }) => {
  //const myContextBroadcast = useContext(EmisorasContext);

  const { getAllEmisoras, emisora } = useContext(EmisorasContext);
  const {search} = useLocation();
  const LIMIT = 20;
  
  // Para serializar el pasro de las variables con URLSearchParams
  // En este caso utilizariamos el metodo get para obtener los parametros que llegan desde la URL, se crean variables par guardar esos valores que veinen de la propiedad search del useLocation


  let query = new URLSearchParams(search); // Objeto de JS

  let start = parseInt(query.get("inicio"))||1; // Traer el valor de la plabra inicio en string, toca convertirla en Int. Si la variable start no esta definida, tome un valor de 1

  let end = parseInt(query.get("fin"))||LIMIT;  // Traer el valor de la palabra fin  en string, toca convertirla en Int. Si la variable end no esta definida, tome un valor de LIMIT





  

  const handleBack = (e) => {
    history.push({search:`?inicio=${start-LIMIT}&fin=${end-LIMIT}`})
  }
  const handleNext = (e) => {
    history.push({search:`?inicio=${start + LIMIT}&fin=${end+LIMIT}`})
  }

  let history = useHistory();

  useEffect(() => {
    getAllEmisoras().catch(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>Listado de informe</h1>
      <p>Listado de Pokemos <b>{start}</b> de <b>{end}</b></p>
      <ListEmisoras emisoras={emisora} />
      {
        start>LIMIT &&(
        <button onClick={handleBack} className="btn btn-primary mt-2 mx-2">Back</button>
        )
      }
      <button onClick={handleNext} className="btn btn-primary mt-2 mx-2">Next</button>
    </div>
  );
};
export default InformesPage;
