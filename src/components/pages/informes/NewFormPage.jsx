import { useContext } from "react"
import EmisorasContext from "../../../contexts/emisoraContext/EmisoraContext"

const NewFormPage = () => {
    
    const myContextBroadcast = useContext(EmisorasContext);

    return (
        <div>
            <h1>Nuevo informe</h1>
           
            {myContextBroadcast.map((emisora) => (
              <ul key={emisora.id}>
                <li>{emisora.id}</li>
                <li>{emisora.nombreEmisora}</li>
                <li>{emisora.frecuenciaEmisora}</li>
              </ul>
            ))}
        </div>
    )
}

export default NewFormPage
