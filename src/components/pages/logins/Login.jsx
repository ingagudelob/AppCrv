import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../../contexts/users/UserContext";
import axios from "axios";
import "./css/stye.css";
import {withRouter} from "react-router-dom"

const URLBasic = "http://localhost:9000/apiscrv/user/";

const Login = (props) => {
  const { 
    setUserIn, 
    userData, 
    setUserData, 
    userActive, 
    setUserActive
  } = useContext(UserContext);
  //console.log(userData);

  const [texto, setTexto] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [inLogin, setinLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // con destructuring
  const handlePassChange = ({ target: { value } }) => setPass(value);

  const handleForSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      console.log("¡Ingresa un email!");
      setTexto("¡Ingresa un email!");
      return;
    }
    if (!pass.trim()) {
      setTexto("¡Ingresa una contraseña!");
      return;
    }

    if (pass.length < 6) {
      setTexto("¡Error de contaseña, menor a 6 caracteres!");
      return;
    }

    userData.map((user) => {
      if (email === user.user && pass === user.pass) {
        e.preventDefault();
        setUserActive(true);
        setinLogin(true);
        setTexto("");
        setIsLoading(true);
        time3Seg();
        setUserIn(user);
        setEmail("");
        setPass("");
        props.history.push("/");
      } else {
        setTexto("¡Error de contraseña o usuario!");
        e.preventDefault();
      }
    });
  };

  const time3Seg = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  const getAllUser = async () => {
    try {
      setIsLoading(true);
      await axios.get(URLBasic + "listUser").then((response) => {
        setUserData(response.data);
      });
    } catch (error) {
      Promise.reject(error);
      setUserData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUser();
    setUserData([]);
    setIsLoading(false);

  }, []);

  return (
    <div className="mt-5 container">
      <h3 className="text-center">Acceso de usuarios</h3>
      <hr />
      
      <div className="row justify-content-center">
        
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <img 
              src="CRV-300X300.PNG" 
              alt="logo-CRV"
              className="img-logo "
        
              />
          <Form onSubmit={handleForSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ padding: "0px" }}>Usuario (*)</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@midominio.com"
                value={email}
                onChange={handleEmailChange}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña (*)</Form.Label>
              <Form.Control
                className="mb-2"
                type="password"
                placeholder="Ingrese contraseña"
                value={pass}
                onChange={handlePassChange}
              />
              {userActive && inLogin ? (
                isLoading && <p>Loading...</p>
              ) : (
                <div className="alert-danger text-center">{texto}</div>
              )}
            </Form.Group>

            <button
              className="btn btn-primary btn-md container"
              type="submit"
              style={{ padding: "5px" }}
            >
              Ingresar
            </button>
          </Form>
        </div>
      </div>
      {isLoading && (
        <div id="container_loading">
          <div id="loading"></div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Login);
