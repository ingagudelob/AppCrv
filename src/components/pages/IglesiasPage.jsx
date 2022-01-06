import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaceOfWorship } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonB from "react-bootstrap/Button";
import "./cssPage/cssPages.css";
import Form from "react-bootstrap/Form";
import Footer from "../../footers/Footer";

const URLBasic = "http://localhost:9000/apiscrv/iglesias/";

const IglesiasPage = () => {
  const [dataIglesia, setDataIglesia] = useState([]);
  const [addData, setAddData] = useState([]);
  //const [tablaBuscar, setTablaBuscar] = useState([]);
  const [menuVisible, setmenuVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [insertIglesia, setInsertIglesia] = useState([]);

  /** Peticion de lectura de Iglesias */

  const getAllUser = async () => {
    await axios.get(URLBasic + "listIglesias").then((response) => {
      setDataIglesia(response.data);
      //setTablaBuscar(response.data);
    });
  };

  // Creamos la petición post
  const addIglesia = async () => {
    await axios
      .post(URLBasic + "addIglesia", insertIglesia)
      .then((response) => {
        setAddData(addData.concat(response.data));
      });
    setmenuVisible(false);
    setEditarVisible(false);
    getAllUser();
  };

  // Creamos la peticion Delete
  const deleteUser = async () => {
    await axios
      .get(URLBasic + "deleteIglesia/" + insertIglesia.id)
      .then((res) => {
        setDataIglesia(
          dataIglesia.filter((user) => user.id !== insertIglesia.id)
        );
      });
    handleDialogEliminar();
    setInsertIglesia([]);
    getAllUser();
  };

  const selectUser = (iglesia, accion) => {
    setInsertIglesia(iglesia);
    if (accion === "Editar") {
      setEditarVisible(true);
    } else {
      handleDialogEliminar();
    }
  };

  const renderFooter = (name) => {
    return (
      <div>
        <div className="text-center mt-2">
          <b>© 2022 Copyright</b> | APP Informes CRV
        </div>
      </div>
    );
  };

  const capturaInput = (e) => {
    const { id, value } = e.target;
    console.log(e.target.value);
    setInsertIglesia((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDialogVisible = () => {
    setmenuVisible(true);
    setInsertIglesia([]);
  };

  const handleDialogEliminar = () => {
    setDeleteVisible(!deleteVisible);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Registro de nuevas Sedes</h1>
        <hr />
        <div>
          <button
            onClick={() => {
              handleDialogVisible();
            }}
            type="button"
            className="btn btn-primary"
          >
            <FontAwesomeIcon
              className=""
              icon={faPlaceOfWorship}
              style={{ fontSize: "25px", margin: "5px" }}
            />
            <b
              style={{
                display: "flex",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              Nueva Iglesia
            </b>
          </button>
        </div>
        <br />

        <Table responsive striped bordered hover size="sm" className="container">
          <thead className="text-center text-bold">
            <tr>
              <td>Codigo</td>
              <td style={{minWidth: "150px"}}>Nombre</td>
              <td>Frecuencia</td>
              <td>Tipo</td>
              <td>Potencia</td>
              <td>Ciudad</td>
              <td>Transmisor Ppal</td>
              <td>Transmisor Aux</td>
              <td>Planta Electrica</td>
              <td>Estudios</td>
              <td>Acción</td>
            </tr>
          </thead>
          <tbody>
            {dataIglesia.map((iglesia) => (
              <tr key={iglesia.id}>
                <td>{iglesia.id}</td>
                <td>{iglesia.nombreIglesia}</td>
                <td>{iglesia.frecuenciaEmisora}</td>
                <td>{iglesia.tipoEmisora}</td>
                <td>{iglesia.potenciaEmisora}</td>
                <td>{iglesia.ciudadEmisora}</td>
                <td>{iglesia.txPrincipal}</td>
                <td>{iglesia.txAuxiliar}</td>
                <td>{iglesia.plantaElectrica}</td>
                <td>{iglesia.estudios ? "Si" : "No"}</td>

                <td  
                    style={{minWidth: "100px"}} 
                    width="10%"
                    className="text-center"
                    >
                  <ButtonB
                    className="mb-1 mt-1"
                    variant="warning"
                    onClick={() => selectUser(iglesia, "Editar")}
                  >
                    <i className="pi pi-pencil" width="20%"></i>
                  </ButtonB>{" "}
                  <ButtonB
                    className="mb-1 mt-1"
                    variant="danger"
                    onClick={() => selectUser(iglesia, "Eliminar")}
                  >
                    <i className="pi pi-trash" width="20%"></i>
                  </ButtonB>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/** ------------------ Ventana para agregar una sede nueva ---------------*/}
      <div>
        <Dialog
          header={<FontAwesomeIcon  fontSize="55px"  style={{margin: "10px 5px 0px 44%", fontSize: "60px"}}  title="Iglesias" icon={faPlaceOfWorship} />}
          visible={menuVisible}
          style={{ width: "400px", fontSize: "12px" }}
          modal={true}
          onHide={() => setmenuVisible(false)}
          footer={<Footer accion="Nueva Sede"/>}
        >
          <div>
            {/*<span className="p-float-label mt-2">
                  <InputText className="container" id="id" onChange={capturaInput} />
                  <label htmlFor="id">Id</label>
                  </span>*/}

            <span className="p-float-label mt-2">
              <InputText
                required
                placeholder="Código"
                className="container"
                id="id"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Nombre"
                className="container"
                id="nombreIglesia"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Frecuencia"
                className="container"
                id="frecuenciaEmisora"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Tipo (FM - AM)"
                className="container"
                id="tipoEmisora"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Potencia"
                className="container"
                id="potenciaEmisora"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Ciudad"
                className="container"
                id="ciudadEmisora"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Tx principal"
                className="container"
                id="txPrincipal"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Tx Auxiliar"
                className="container"
                id="txAuxiliar"
                onChange={capturaInput}
              />
            </span>

            <span className="p-float-label mt-3">
              <InputText
                required
                placeholder="Plata Electrica"
                className="container"
                id="plantaElectrica"
                onChange={capturaInput}
              />
            </span>

            {/*
                <div className="p-field-checkbox mt-2">
                  <Checkbox
                    inputId="binary"
                    checked={onCheck}
                    onChange={(e) => {
                      setInChecked("admin");
                      setOnCheck(!onCheck);
                      capturaInput();
                    }}
                    id="role"
                    value={inChecked}
                  />
                  <label style={{ paddingLeft: "10px" }} htmlFor="binary">
                    Admin
                  </label>
                </div>*/}

            <div className="mt-2">
              <div style={{ paddingTop: "10px" }}>
                <Form>
                  <p className="mx-1">Estudios: </p>
                  <div className="mx-1">
                    <Form.Check
                      inline
                      label="Si"
                      name="estudioAdd"
                      type="radio"
                      id="estudios"
                      value="true"
                      onChange={(evento) => {
                        const { id, value } = evento.target;
                        setInsertIglesia((prevState) => ({
                          ...prevState,
                          [id]: value,
                        }));
                      }}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="estudioAdd"
                      type="radio"
                      id="estudios"
                      value="false"
                      onChange={(evento) => {
                        const { id, value } = evento.target;
                        setInsertIglesia((prevState) => ({
                          ...prevState,
                          [id]: value,
                        }));
                      }}
                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>

          <div className="">
            <div className="row">
              <div className="col text-center">
                <Button
                  label="Agregar"
                  icon="pi pi-check"
                  onClick={() => addIglesia()}
                  className="p-button-success mt-2 "
                />
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      {/* ------------------ Ventana para editar una Sede ---------------*/}

      <Dialog
        header={<FontAwesomeIcon  fontSize="55px"  style={{margin: "10px 5px 0px 44%", fontSize: "60px"}}  title="Iglesias" icon={faPlaceOfWorship} />}
        visible={editarVisible}
        style={{width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setEditarVisible(false)}
        footer={<Footer accion="Editar Sede"/>}
        
      >
        <div>

          <span className="p-float-label mt-4">
            <InputText
              disabled
              className="container"
              id="id"
              value={insertIglesia.id}
              onChange={capturaInput}
            />
            <label htmlFor="user">Identificación</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="nombreEmisora"
              value={insertIglesia && insertIglesia.nombreEmisora}
              onChange={(e) => {
                console.log(e.target.value);
                const { id, value } = e.target;
                setInsertIglesia((prevState) => ({
                  ...prevState,
                  [id]: value,
                }));
              }}
            />
            <label htmlFor="user">Nombre</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="frecuenciaEmisora"
              value={insertIglesia && insertIglesia.frecuenciaEmisora}
              onChange={capturaInput}
            />
            <label htmlFor="user">Frecuencia</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="tipoEmisora"
              value={insertIglesia && insertIglesia.tipoEmisora}
              onChange={capturaInput}
            />
            <label htmlFor="user">Tipo (AM - FM)</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="potenciaEmisora"
              value={insertIglesia && insertIglesia.potenciaEmisora}
              onChange={capturaInput}
            />
            <label htmlFor="user">Potencia</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="ciudadEmisora"
              value={insertIglesia && insertIglesia.ciudadEmisora}
              onChange={capturaInput}
            />
            <label htmlFor="user">Ciudad</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="txPrincipal"
              value={insertIglesia && insertIglesia.txPrincipal}
              onChange={capturaInput}
            />
            <label htmlFor="user">Tx Principal</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="txAuxiliar"
              value={insertIglesia && insertIglesia.txAuxiliar}
              onChange={capturaInput}
            />
            <label htmlFor="user">Tx Auxiliar</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="plantaElectrica"
              value={insertIglesia && insertIglesia.plantaElectrica}
              onChange={capturaInput}
            />
            <label htmlFor="user">Planta Electrica</label>
          </span>

          <div style={{ paddingTop: "10px" }}>
            <Form>
              <p className="mx-1">Estudios: </p>
              <div className="mx-1">
                <Form.Check
                  inline
                  label="Si"
                  name="group1"
                  type="radio"
                  id="estudios"
                  value="true"
                  onChange={(evento) => {
                    const { id, value } = evento.target;
                    setInsertIglesia((prevState) => ({
                      ...prevState,
                      [id]: value,
                    }));
                  }}
                />
                <Form.Check
                  inline
                  label="No"
                  name="group1"
                  type="radio"
                  id="estudios"
                  value="false"
                  onChange={(evento) => {
                    const { id, value } = evento.target;
                    setInsertIglesia((prevState) => ({
                      ...prevState,
                      [id]: value,
                    }));
                  }}
                />
              </div>
            </Form>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => addIglesia()}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* ------------------ Ventana para confirmar al eliminar una Sede ---------------*/}

      <Dialog
        header="Eliminar Sede"
        visible={deleteVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => handleDialogEliminar(false)}
        footer={renderFooter("displayBasic")}
      >
        <h5>
          ¿Deseas eliminar la sede:{" "}
          <b>{insertIglesia && insertIglesia.nombreIglesia}</b>?
        </h5>
        <div align="right">
          <ButtonB
            className="mx-2"
            variant="danger"
            onClick={() => {
              deleteUser();
            }}
          >
            Aceptar
          </ButtonB>
        </div>
      </Dialog>
    </>
  );
};

export default IglesiasPage;
