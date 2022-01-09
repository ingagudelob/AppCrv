import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import EmisorasContext from "../../../contexts/emisoraContext/EmisoraContext";

export default function DetailEmisoras() {
  /**
   * Cada que se cargue la pantalla o cada que se cambie el id
   * solcitar el detalle del informe, utilizando un useEfecct
   */

  const { getAllIformesDetail, informesDetail } = useContext(EmisorasContext);
  const { id } = useParams();

  useEffect(() => {
    getAllIformesDetail(id).catch(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>DetailEmisoras</h1>
      <ul>
        <li>{`Nombre: ${informesDetail?.name}`}</li>
        <li>{`Peso: ${informesDetail?.weight} Kg`}</li>
        <li>{`Altura: ${informesDetail?.height} m`}</li>
      </ul>
    </div>
  );
}
