import Form from "react-bootstrap/Form";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "primereact/button";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../../contexts/users/UserContext";
import axios from "axios";
import "./css/stye.css"


const URLBasic = "http://localhost:9000/apiscrv/user/";

const LoginPage = ({url}) => {

  const { setUserIn, userData, setUserData } = useContext(UserContext);
  //console.log(userData);

  const [texto, setTexto] = useState("");
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [inUser, setInUser] = useState(false);
  const [inLogin, setinLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onHide = false;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // con destructuring
  const handlePassChange = ({ target: { value } }) => setPass(value);

  const handleForSubmit = (e) => {
      e.preventDefault();

          if(!email.trim()){
            console.log("¡Ingresa un email!");
            setTexto("¡Ingresa un email!")
            return
          }
          if(!pass.trim()){
            setTexto("¡Ingresa una contraseña!");
            return
          }

          if(pass.length <= 8){
            setTexto("Ingresa una contaseña mayor o igual a 8 caracteres");
            return
          }

          userData.map((user)=>{
          
          if (email === user.user && pass === user.pass) {
              e.preventDefault();
              setInUser(true);
              setinLogin(true);
              setTexto("");
              setIsLoading(true);
              time3Seg();
              setUserIn(user);
            } else {
                setTexto("¡Error de contraseña o usuario!");
                e.preventDefault();
            }
        })
  };

  const time3Seg = () => {
    setTimeout(() => {
      setIsLoading(false);
      setVisible(false);
    }, 1200);
  };

  const getAllUser = async () =>{

    try {
      setIsLoading(true);
      await axios.get(URLBasic + "listUser").then((response) => {
        setUserData(response.data);

      });
    } catch (error) {
        Promise.reject(error);
      setUserData([]);
    }finally{
      setIsLoading(false);

    }
  };


  useEffect(() => {
    getAllUser().catch(null);
  }, []);



  return (
    <div>

      <Dialog
        className="class-dialog"
        visible={visible}
        onHide={() => setVisible(false)}
        breakpoints={{ "660px": "65vw", "440px": "90vw" }}
        
      >
        <Card style={{ width: "100%", marginBottom: "1em" }}>
          <Card.Img
            className="img-logo "
            width="30%"
            variant="top"
            src="CRV-300X300.PNG"
            
            alt=""
          />
          <Card.Title className="text-center">
            Ingreso a la plataforma
          </Card.Title>
          <Card.Body>
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
                  type="password"
                  placeholder="Ingrese contraseña"
                  value={pass}
                  onChange={handlePassChange}
                />
                {inUser && inLogin ? (
                  isLoading && <p>Loading...</p>
                ) : (
                  <div className="alert-danger text-center">{texto}</div>
                )}
              </Form.Group>

              <Button type="submit" style={{ padding: "5px" }}>
                Aceptar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Dialog>
      {isLoading && (
        <div id="container_loading">
          <div id="loading"></div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
