import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import EmisorasPage from "../components/pages/emisoras/EmisorasPage";
import HomePage from "../components/pages/home/HomePage";
import IglesiasPage from "../components/pages/iglesias/IglesiasPage";
import DetailEmisoras from "../components/pages/informes/DetailEmisoras";
import NewFormPage from "../components/pages/informes/NewFormPage";
import InformesPage from "../components/pages/informes/InformesPage";
import { NoFoundPage } from "../components/pages/NoFoundPage/NoFoundPage";
import UserPage from "../components/pages/usuarios/UserPage";
import Login from "../components/pages/logins/Login";
import UserPerfil from "../components/pages/usuarios/UserPerfil";
import ReportPage from "../components/pages/reportes/ReportPage";
import DashBoardPage from "../components/pages/dashboard/DashBoardPage";
import PrivateRouters from "./privates/PrivateRouters";
/*import { useContext } from "react";
import UserContext from "../contexts/users/UserContext";
import { Redirect } from "react-router-dom";
*/

const AppRouter = (props) => {

  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <PrivateRouters exact path="/" component={HomePage}></PrivateRouters>
        <Route exact path="/nuevoInforme" component={NewFormPage}></Route>
        <Route exact path="/listarInformes/:id" component={DetailEmisoras}></Route>
        <Route exact path="/listarInformes" component={InformesPage}></Route>
        <PrivateRouters exact path="/users" component={UserPage}></PrivateRouters>
        <Route exact path="/userperfil/:id" component={UserPerfil}></Route>
        <PrivateRouters exact path="/emisoras" component={EmisorasPage}></PrivateRouters>
        <PrivateRouters exact path="/iglesias" component={IglesiasPage}></PrivateRouters>
        <PrivateRouters exact path="/dashboard" component={DashBoardPage}></PrivateRouters>
        <Route exact path="/reportes" component={ReportPage}></Route>

        <Route path="*" component={NoFoundPage} />
      </Switch>
    </>
  );
};

export default AppRouter;
