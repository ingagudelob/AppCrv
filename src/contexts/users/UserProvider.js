import { useState } from "react"
import UserContext from "./UserContext"

const UserProvider = ({children}) => {

    const [userLogin] = useState({email:"inge@gmail.com", pass: "12345"});

    return (

             <UserContext.Provider value={userLogin}>
                {children}
             </UserContext.Provider>

    )
}

export default UserProvider
  