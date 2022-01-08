// Para poder suscribirme al contexto debo importar el hook de react, useContext

import { useEffect } from "react";
import { useContext } from "react";
import EmisorasContext from "../../../contexts/emisoraContext/EmisoraContext";

const NewFormPage = () => {
  //const myContextBroadcast = useContext(EmisorasContext);

  const { getAllEmisoras, emisora } = useContext(EmisorasContext);

  useEffect(() => {
    getAllEmisoras().catch(null);
  }, []);

  return (
    <div>
      <h1>Nuevo informe</h1>

      {emisora.map((emisora, index) => (
        <ul key={index}>
          <li>{emisora.name}</li>
          <button>Ver detalles</button>
        </ul>
      ))}
    </div>
  );
};

export default NewFormPage;
