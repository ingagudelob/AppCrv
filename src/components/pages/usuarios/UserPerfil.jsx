import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserContext from "../../../contexts/users/UserContext";
import Footer from "../../../footers/Footer";

const URLBasic = "http://localhost:9000/apiscrv/user/";

const UserPerfil = () => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleEditPass, setVisibleEditPass] = useState(false);
  const [userEditar, setUserEditar] = useState([]);
  const [passEditar, setPassEditar] = useState([]);

  let { id } = useParams();
  let { userIn, setUserIn, getAllUser } = useContext(UserContext);
  const [addData, setAddData] = useState([]);

  const getAllUserLocal = async () => {
    await axios.get(URLBasic + "listUser").then((response) => {
      setUserEditar(userIn);
    });
  };

  const addUser = async () => {
    await axios.post(URLBasic + "addUser", userEditar).then((response) => {
      setAddData(addData.concat(response.data));
    });
    setVisibleEdit(false);
    setUserIn(userEditar);
    getAllUser();
    getAllUserLocal();
  };

  const handleEdit = () => {
    setVisibleEdit(true);
  };

  const handleEditPass = () => {
    setVisibleEditPass(true);
  };

  const capturaInput = (e) => {
    const { id, value } = e.target;
    setUserEditar((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    getAllUserLocal();
  }, []);

  //let params = useParams();
  //console.log(params)
  return (
    <div className="mt-2 container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <h1>Perfil del Usuario</h1>
          <hr />
          <p>
            <b> Id del Usuario: </b>
            {id}
          </p>
          <div>
            <p>
              <b> Nombre del usuario: </b>
              {userIn.userName}
            </p>
            <p>
              <b> Usuario: </b>
              {userIn.user}
            </p>
            <p>
              <b> Sede: </b>
              {userIn.sede}
            </p>
            <p>
              <b> Rol: </b>
              {userIn.role}
            </p>

            <button
              style={{ float: "left" }}
              className="btn btn-danger mx-2"
              onClick={handleEdit}
            >
              Editar
            </button>
          </div>
          <div className="mt-2">
            <button className="btn btn-danger" onClick={handleEditPass}>
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>

      {/* --------------  EDITAR USUARIO PERFIL ----------------- */}
      <Dialog
        header={
          <FontAwesomeIcon
            fontSize="55px"
            style={{ margin: "10px 5px 0px 44%", fontSize: "60px" }}
            title="Iglesias"
            icon={faUserEdit}
          />
        }
        visible={visibleEdit}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setVisibleEdit(false)}
        footer={<Footer accion="Editar Usuario" />}
      >
        <div>
          <span className="p-float-label mt-4">
            <InputText
              disabled
              className="container"
              id="id"
              value={userEditar && userEditar.id}
              onChange={capturaInput}
            />
            <label htmlFor="user">Identificación</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              disabled
              className="container"
              id="user"
              value={userEditar && userEditar.user}
              onChange={capturaInput}
            />
            <label htmlFor="user">Usuario (E-mail)</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              disabled
              className="container"
              id="pass"
              type="password"
              value={userEditar && userEditar.pass}
              onChange={capturaInput}
            />
            <label htmlFor="user">Contraseña</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="userName"
              value={userEditar && userEditar.userName}
              onChange={capturaInput}
            />
            <label htmlFor="user">Nombre</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="userTelephone"
              value={userEditar && userEditar.userTelephone}
              onChange={capturaInput}
            />
            <label htmlFor="user">Teléfono o Celular</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="sede"
              value={userEditar && userEditar.sede}
              onChange={capturaInput}
            />
            <label htmlFor="user">Ciudad</label>
          </span>
        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => addUser()}
                className="p-button-success mt-2 "
              >
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* --------------  CAMBIAR CONTRASEÑA ----------------- */}
      <Dialog
        header={
          <FontAwesomeIcon
            fontSize="55px"
            style={{ margin: "10px 5px 0px 44%", fontSize: "60px" }}
            title="Iglesias"
            icon={faUserEdit}
          />
        }
        visible={visibleEditPass}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setVisibleEditPass(false)}
        footer={<Footer accion="Editar Contraseña" />}
      >
        <div>
          <span className="p-float-label mt-4">
            <InputText
              placeholder="Ingrese contraseña actual:"
              className="container"
              id="passOld"
              type="password"
              value={userEditar && passEditar.pass}
              onChange={capturaInput}
            />
          </span>

          <span className="p-float-label mt-2">
            <InputText
              placeholder="Nueva contraseña:"
              className="container"
              id="passNew"
              type="password"
              value={userEditar && passEditar.pass}
              onChange={capturaInput}
            />
          </span>

          <span className="p-float-label mt-2">
            <InputText
              placeholder="Confirme contraseña:"
              className="container"
              id="passConf"
              type="password"
              value={userEditar && passEditar.pass}
              onChange={capturaInput}
            />
          </span>
        </div>

        {
          
        }

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => addUser()}
                className="p-button-success mt-2 "
              >
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserPerfil;
