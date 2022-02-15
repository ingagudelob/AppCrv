import React, { useContext } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import UserContext from '../../contexts/users/UserContext';


// const PrivateRouters = ({...props}) => {

//   const { userActive, userIn } = useContext(UserContext);
 
//   if(!userActive||userIn?.role==="tecnico") return <Redirect to="/login"/>
  
//   return <Route {...props}/>

// };

const PrivateRouters = ({component: Component,...rest}) => {

  const { userActive, userIn } = useContext(UserContext);
 
  if(!userActive||userIn?.role==="tecnico") return <Redirect to="/login"/>
  
  return <Route {...rest}>{userActive||userIn?.role==="tecnico"?<Component/>:<Redirect to="/login"/>} </Route>

};

export default withRouter(PrivateRouters);
