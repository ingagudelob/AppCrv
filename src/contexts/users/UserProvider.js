import { useState } from "react";
import UserContext from "./UserContext";
import ApiUser from "../../apis/ApiUser"

const UserProvider = ({ children }) => {

  const [userIn, setUserIn] = useState([]);
  const [userActive, setUserActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const logout = () =>{ setUserIn(null)};
  
  const getAllUser = async () =>{

    try {
      setIsLoading(true);
      const userRes = await ApiUser ({
        url: "http://localhost:9000/apiscrv/user/listUser",
        
      }); 
      setUserData(userRes.response);
    } catch (error) {
        Promise.reject(error);
      setUserData([]);
    }finally{
      setIsLoading(false);

    }
  };

  const contextValue = {
    userActive, 
    setUserActive,
    getAllUser,
    userIn,
    setUserIn,
    isLoading,
    userData,
    setUserData,
    logout
  }


  return (
    <UserContext.Provider value={ contextValue }>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
