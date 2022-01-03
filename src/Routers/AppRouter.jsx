import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "../components/pages/HomePage";
import InformesPage from "../components/pages/InformesPage";
import { NoFoundPage } from "../components/pages/NoFoundPage";
import UserPage from "../components/pages/UserPage";
import Navigator from "../navigators/Navigator";

const AppRouter = (props) => {

  return (
    <Router>
      <Navigator />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/nuevoInforme"></Route>
        <Route exact path="/listarInformes" component={InformesPage}></Route>
        <Route exact path="/users" component={UserPage}></Route>
        <Route exact path="/buscarUsuarios"></Route>
        <Route exact path="/eventos"></Route>

        <Route path="*" component={NoFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;