import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import './cssPage/cssPages.css'
import { Checkbox } from 'primereact/checkbox';

const URLBasic = "http://localhost:9000/apiscrv/user/";

const UserPage = () => {

  const [dataUser, setDataUser] = useState([]);
  const [addData, setAddData] = useState([]);
  const [tablaBuscar, setTablaBuscar] = useState([]);
  const [menuVisible, setmenuVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [insertSuplier, setInsertSuplier] = useState([]);
  const [checked, setChecked] = useState(false);

  /** Peticion de lectura de usuarios */

  const getAllUser = async () => {
    await axios.get(URLBasic + "listUser").then((response) => {
      setDataUser(response.data);
      setTablaBuscar(response.data);
      console.log(response);
    });
  };

  // Creamos la petición post
  const addUser = async () => {
    await axios.post(URLBasic + "addUser", insertSuplier).then((response) => {
      setAddData(addData.concat(response.data));
    });
    setmenuVisible(false);
    setEditarVisible(false);
    getAllUser();
  };


  const renderFooter = (name) => {
    return (
      <div>
        <div className="text-center mt-2">
          <b>© 2021 Copyright</b> | APP Informes CRV
        </div>
      </div>
    );
  };

  const handleCheckRole = (click)=>{
    console.log(click.target.value)
    
  }

  const capturaInput = (e) => {
    const { id, value } = e.target;
    setInsertSuplier((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  
  const handleDialogVisible = ()=>{
    setmenuVisible(true);
    setInsertSuplier([]);
  }


  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Registro de nuevos técnicos</h1>
        <hr/>
        <div>
          <button 
            onClick={()=>{handleDialogVisible()}}
            type="button" 
            className="btn btn-primary"><FontAwesomeIcon className="" icon={faUserPlus} 
            style={{fontSize: "25px", margin: "5px"}}/>
              <b style={{display: "flex", alignContent: "center", textAlign: "center"}}>
              Nuevo Usuario</b>
          </button>
        </div>
        <br/>

        <Table className="container">
          <thead className="text-center text-bold">
            <tr>
              <td>Id</td>
              <td>Nombre</td>
              <td>Teléfono</td>
              <td>Usuario</td>
              <td>Contraseña</td>
              <td>Sede</td>
              <td>Rol</td>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.userName}</td>
                <td>{usuario.userTelephone}</td>
                <td>{usuario.user}</td>
                <td>{usuario.pass}</td>
                <td>{usuario.sede}</td>
                <td>{usuario.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/** ------------------ Ventana para agregar proveedor nuevo ---------------*/}
      <div>

        <Dialog
          header="Agregar técnico nuevo"
          visible={menuVisible}
          style={{ width: "400px", fontSize: "12px" }}
          modal={true}
          onHide={() => setmenuVisible(false)}
          footer={renderFooter("displayBasic")}
        >
          <div>
            {/*<span className="p-float-label mt-2">
              <InputText className="container" id="id" onChange={capturaInput} />
              <label htmlFor="id">Id</label>
              </span>*/}

            <span className="p-float-label mt-4">
              <InputText 
                className="container" 
                id="id" 
                onChange={capturaInput} />
              <label htmlFor="user">Identificación</label>
            </span>

            <span className="p-float-label mt-4">
              <InputText
                className="container"
                id="userName"
                onChange={capturaInput}
              />
              <label htmlFor="user">Nombre del cliente</label>
            </span>

            <span className="p-float-label mt-4">
              <InputText
                className="container"
                id="userTelephone"
                onChange={capturaInput}
              />
              <label htmlFor="user">Telefono o Celular</label>
            </span>

            <span className="p-float-label mt-4">
              <InputText
                className="container"
                id="user"
                onChange={capturaInput}
              />
              <label htmlFor="user">Usuario(email)</label>
            </span>

            <span className="p-float-label mt-4">
              <InputText
                className="container"
                id="pass"
                onChange={capturaInput}
              />
              <label htmlFor="user">Contraseña</label>
            </span>

            <span className="p-float-label mt-4">
              <InputText
                className="container"
                id="sede"
                onChange={capturaInput}
              />
              <label htmlFor="user">Ciudad</label>
            </span>

            <div className="p-field-checkbox mt-2">
                    <Checkbox 
                      inputId="binary" checked={checked} 
                      onChange={(e)=>{
                        setChecked(true)
                      }}
                      id="role"
                      value="regular"
                    />
                    <label htmlFor="binary">Admin</label>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col text-center">
                <Button
                  label="Agregar"
                  icon="pi pi-check"
                  onClick={() => addUser()}
                  className="p-button-success mt-2 "
                />
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      {/* ------------------ Ventana para editar un prodcuto ---------------*/}

      <Dialog
        header="Editar técnico"
        visible={editarVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setEditarVisible(false)}
        footer={renderFooter("displayBasic")}
      >
        <div>
          {/*<span className="p-float-label mt-2">
            <InputText
              className="container"
              id="id"
              disabled
              value={insertSuplier && insertSuplier.id}
              onChange={capturaInput}
            />
            <label htmlFor="id">Id</label>
    </span>*/}

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="id"
              value={insertSuplier && insertSuplier.id}
              onChange={capturaInput}
            />
            <label htmlFor="user">Identificación</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientName"
              value={insertSuplier && insertSuplier.clientName}
              onChange={capturaInput}
            />
            <label htmlFor="user">Nombre</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientNumber"
              value={insertSuplier && insertSuplier.clientNumber}
              onChange={capturaInput}
            />
            <label htmlFor="user">Teléfono o Celular</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientAdress"
              value={insertSuplier && insertSuplier.clientAdress}
              onChange={capturaInput}
            />
            <label htmlFor="user">Dirección</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientEmail"
              value={insertSuplier && insertSuplier.clientEmail}
              onChange={capturaInput}
            />
            <label htmlFor="user">Correo</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="sede"
              value={insertSuplier && insertSuplier.sede}
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
              />
            </div>
          </div>
        </div>
      </Dialog>

    </>
  );
};

export default UserPage;
