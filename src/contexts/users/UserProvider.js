import { useState } from "react";
import UserContext from "./UserContext";
import ApiUser from "../../apis/ApiUser"

const UserProvider = ({ children }) => {

  const [userIn, setUserIn] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);

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


  return (
    <UserContext.Provider value={{ getAllUser, userIn, setUserIn, isLoading, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
