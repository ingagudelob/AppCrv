import React from 'react'
import { useParams } from 'react-router-dom'

const UserPerfil = () => {

    let {userName, age} = useParams();
    //let params = useParams();
    //console.log(params)
  return (
    <div>
        UserPerfil
        <p><b> Nombre del Usuario: </b>{userName}</p>
    </div>
  )
}

export default UserPerfil