import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import EmisorasPage from "../components/pages/emisoras/EmisorasPage";
import HomePage from "../components/pages/HomePage";
import IglesiasPage from "../components/pages/iglesias/IglesiasPage";
import NewFormPage from "../components/pages/informes/NewFormPage";
import InformesPage from "../components/pages/InformesPage";
import LoginPage from "../components/pages/logins/LoginPage";
import { NoFoundPage } from "../components/pages/NoFoundPage";
import UserPage from "../components/pages/usuarios/UserPage";
import Navigator from "../navigators/Navigator";

const AppRouter = (props) => {
  return (
    <Router>
      <Navigator />
      <Switch>
        
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/loginPage" component={LoginPage}></Route>
        <Route exact path="/nuevoInforme" component={NewFormPage}></Route>
        <Route exact path="/listarInformes" component={InformesPage}></Route>
        <Route exact path="/users" component={UserPage}></Route>
        <Route exact path="/emisoras" component={EmisorasPage}></Route>
        <Route exact path="/iglesias" component={IglesiasPage}></Route>
        <Route exact path="/buscarUsuarios"></Route>
        <Route exact path="/eventos"></Route>

        <Route path="*" component={NoFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
