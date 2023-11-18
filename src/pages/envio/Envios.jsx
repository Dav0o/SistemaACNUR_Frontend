import { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Accordion } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/axios";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";

function Envios() {
  const [refresh, setRefresh] = useState(false);
  const [envios, setEnvios] = useState([]);
  const [unidadMedidas, setUnidadMedidas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEnvio, setEditingEnvio] = useState(null);
  /*   const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsEnvio, setDetailsEnvio] = useState({}); */
  const [mostrarParteAdicional, setMostrarParteAdicional] = useState("");
  const [selectedEnvio, setSelectedEnvio] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState(new Set());
  const [users, setUsers] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [inventarrioAlimentos, setInventarioAlimentos] = useState([]);

  const idEnvio = useRef(null);
  const destino = useRef(null);
  const fechaEnvio = useRef(null);
  const tipoAyuda = useRef(null);
  const cantidad = useRef(0);
  const unidadMedidaId = useRef(1);
  /* const usuario = useRef(null); */

  useEffect(() => {
    api
      .get("Envios")
      .then((response) => {
        setEnvios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("UnidadMedidas")
      .then((response) => {
        setUnidadMedidas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("Usuario")
      .then((response) => {
        setUsers(response.data);
        /* console.log(response.data); */
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("Almacens")
      .then((response) => {
        setAlmacenes(response.data);
        console.log("Almacenes: ", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("InventarioAlimentos")
      .then((response) => {
        setInventarioAlimentos(response.data);
        console.log("Inventario de Alimentos: ", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [refresh]);

  const handleSave = () => {
    let newEnvio = {
      idEnvio: idEnvio.current.value,
      destino: destino.current.value,
      fechaEnvio: fechaEnvio.current.value,
      tipoAyuda: tipoAyuda.current.value,
      cantidad: cantidad.current.value,
      unidadMedidaId: unidadMedidaId.current.value,
    };

    if (mostrarParteAdicional === "Humanitaria") {
      newEnvio = {
        ...newEnvio,
        cantidad: 0,
        unidadMedidaId: 1,
      };
    }

    api
      .post("Envios", newEnvio)
      .then((response) => {
        console.log(response.data);
        Swal.fire("Éxitosamente", "Administrador ha sido guardado.", "success");
      })
      .catch((error) => {
        console.log("Nuestro JSON: ", newUser, "EL ERROR: ", error);

        Swal.fire(
          "Error!",
          "Ha habido un error al guardar el administrador, revisa la información digitada!.",
          "error"
        );
        setRefresh(!refresh);


      })
      .catch((error) => {
        console.log("Nuestro JSON: ", newUser, "EL ERROR: ", error);
        console.log(response.data);
        setRefresh(!refresh);

        idEnvio.current.value = "";
        destino.current.value = "";
        fechaEnvio.current.value = "";
        tipoAyuda.current.value = "";
        cantidad.current.value = "";
        unidadMedidaId.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });

    if (mostrarParteAdicional === "Humanitaria") {
      [...usuariosSeleccionados].forEach((dniUsuario) => {
        api
          .post("EnvioHumanitarios", {
            idEnvio: idEnvio.current.value,
            dniUsuario: dniUsuario,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log("Error en Tabla Intermedia: ", error);
          });
      });
    }
    idEnvio.current.value = "";
    destino.current.value = "";
    fechaEnvio.current.value = "";
    tipoAyuda.current.value = "";
    cantidad.current.value = "";
    unidadMedidaId.current.value = "";
  };

  //Modal Editar
  const handleEditModal = (envio) => {
    setShowEditModal(true);
    setEditingEnvio(envio);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingEnvio(null);
  };

  const handleDetailsClick = (envio) => {
    setSelectedEnvio(envio);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const handleUpdate = () => {
    let updatedEnvio = {
      idEnvio: idEnvio.current.value,
      destino: destino.current.value,
      fechaEnvio: fechaEnvio.current.value,
      tipoAyuda: tipoAyuda.current.value,
      cantidad: cantidad.current.value,
      unidadMedidaId: unidadMedidaId.current.value,
    };

    api
      .put("Envios", updatedEnvio)
      .then((response) => {
        console.log(response);

        handleCloseEditModal();
        setRefresh(!refresh);

        idEnvio.current.value = "";
        destino.current.value = "";
        fechaEnvio.current.value = "";
        tipoAyuda.current.value = "";
        cantidad.current.value = "";
        unidadMedidaId.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeTipoAyuda = () => {
    const valorTipoAyuda = tipoAyuda.current.value;

    // Aquí puedes ajustar las condiciones según tus necesidades
    if (valorTipoAyuda === "Humanitaria") {
      setMostrarParteAdicional("Humanitaria");
    } else if (valorTipoAyuda === "Medicamentos") {
      setMostrarParteAdicional("Medicamentos");
    } else if (valorTipoAyuda === "Alimentos") {
      setMostrarParteAdicional("Alimentos");
    }
  };

  const handleCheckboxChange = (dniUsuario) => {
    setUsuariosSeleccionados((prevSelected) => {
      const updatedSet = new Set(prevSelected);

      if (updatedSet.has(dniUsuario)) {
        updatedSet.delete(dniUsuario);
        console.log("Eliminado", dniUsuario);
      } else {
        updatedSet.add(dniUsuario);
        console.log("Agregado", dniUsuario);
      }

      return updatedSet;
    });
  };

  return (
    <Container className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Envíos</h1>
      <p className="mb-4">Lista de los envíos</p>

      <div className="card shadow mb-4">
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Click aquí para crear un envío</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputIdEnvio">Id Envío</Form.Label>
                    <Form.Control type="number" id="inputEnvio" ref={idEnvio} />
                  </Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputDestino">Destino</Form.Label>
                    <Form.Control type="text" id="inputDestino" ref={destino} />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputFechaEnvio">
                      Fecha del envío{" "}
                    </Form.Label>
                    <Form.Control
                      type="datetime-local"
                      id="inputFechaEnvio"
                      ref={fechaEnvio}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputTipoAyuda">
                      Tipo de ayuda
                    </Form.Label>
                    <Form.Control
                      as="select"
                      id="inputTipoAyuda"
                      ref={tipoAyuda}
                      onChange={handleChangeTipoAyuda}
                    >
                      <option value="a" key={4}>
                        Seleccione un tipo de ayuda
                      </option>
                      <option value="Humanitaria" key={1}>
                        Humanitaria
                      </option>
                      <option value="Medicamentos" key={2}>
                        Medicamentos
                      </option>
                      <option value="Alimentos" key={3}>
                        Alimentos
                      </option>
                    </Form.Control>
                  </Col>
                </Row>

                {mostrarParteAdicional === "Humanitaria" && (
                  <Row>
                    <Col>
                      <Form.Label htmlFor="input">
                        <strong>Humanitaria</strong>
                      </Form.Label>
                      {users.map((user) => (
                        <Form.Check
                          key={user.dniUsuario}
                          type="checkbox"
                          label={`${user.dniUsuario}-${user.nombreUsuario} ${user.apellido1}`}
                          id={`checkbox-${user.dniUsuario}`}
                          checked={usuariosSeleccionados.has(user.dniUsuario)}
                          onChange={() => handleCheckboxChange(user.dniUsuario)}
                        />
                      ))}
                    </Col>
                    <Col>
                      <Form.Label htmlFor="input">
                        <strong>Usuarios seleccionados</strong>
                      </Form.Label>
                      <ul>
                        {[...usuariosSeleccionados].map((dniUsuario) => (
                          <li key={dniUsuario}>
                            {
                              users.find(
                                (user) => user.dniUsuario === dniUsuario
                              )?.nombreUsuario
                            }{" "}
                            {
                              users.find(
                                (user) => user.dniUsuario === dniUsuario
                              )?.apellido1
                            }
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                )}

                {mostrarParteAdicional === "Medicamentos" && (
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputCantidad">Cantidad</Form.Label>
                      <Form.Control
                        type="number"
                        id="inputCantidad"
                        ref={cantidad}
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="inputUnidadMedida">
                        Unidad de Medida
                      </Form.Label>
                      <Form.Control
                        as="select"
                        id="inputUnidadMedida"
                        ref={unidadMedidaId}
                      >
                        <option value="" key={0}>
                          Seleccione una unidad de medida
                        </option>
                        {unidadMedidas.map((unidad) => (
                          <option
                            key={unidad.idUnidadMedida}
                            value={unidad.idUnidadMedida}
                          >
                            {unidad.unidad}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                )}

                {mostrarParteAdicional === "Alimentos" && (
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputCantidad">Cantidad</Form.Label>
                      <Form.Control
                        type="number"
                        id="inputCantidad"
                        ref={cantidad}
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="inputUnidadMedida">
                        Unidad de Medida
                      </Form.Label>
                      <Form.Control
                        as="select"
                        id="inputUnidadMedida"
                        ref={unidadMedidaId}
                      >
                        <option value="" key={0}>
                          Seleccione una unidad de medida
                        </option>
                        {unidadMedidas.map((unidad) => (
                          <option
                            key={unidad.idUnidadMedida}
                            value={unidad.idUnidadMedida}
                          >
                            {unidad.unidad}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                )}

                <Button variant="primary" onClick={handleSave} className="mt-3">
                  Guardar
                </Button>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="card-body">
        <Table striped="columns" id="tableEnvios">
          <thead>
            <tr>
              <th>id</th>
              <th>Destino</th>
              <th>Fecha de Envio</th>
              <th>Tipo de Ayuda</th>
              <th>Cantidad </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {envios.map((envio) => (
              <tr key={envio.idEnvio}>
                <td>{envio.idEnvio}</td>
                <td>{envio.destino}</td>
                <td>{envio.fechaEnvio}</td>
                <td>{envio.tipoAyuda}</td>
                <td>
                  {envio.cantidad} {envio.UnidadMedida?.Unidad ?? " "}
                </td>
                <td>
                  <Button
                    variant="success"
                    key={`actualizar-${envio.idEnvio}`}
                    onClick={() => handleEditModal(envio)}
                    className="mt-3"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} /> Actualizar
                  </Button>{" "}
                  <Button
                    variant="info"
                    key={`detalles-${envio.idEnvio}`}
                    onClick={() => handleDetailsClick(envio)}
                    className="mt-3 text-white"
                  >
                    <FontAwesomeIcon icon={faCircleInfo} /> Detalles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar envío</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Label>Id Envio</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={editingEnvio ? editingEnvio.idEnvio : ""}
                  ref={idEnvio}
                  readOnly
                />
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <Form.Label>Destino</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={editingEnvio ? editingEnvio.destino : ""}
                  ref={destino}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label>Fecha de envío</Form.Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={editingEnvio ? editingEnvio.fechaEnvio : ""}
                  ref={fechaEnvio}
                />
              </Col>

              <Col>
                <Form.Label htmlFor="inputTipoAyuda">Tipo de ayuda</Form.Label>
                <Form.Control
                  as="select"
                  id="inputTipoAyuda"
                  ref={tipoAyuda}
                  defaultValue={editingEnvio ? editingEnvio.tipoAyuda : ""}
                >
                  <option value="" key={0}>
                    Seleccione un tipo de ayuda
                  </option>
                  <option value="Humanitaria" key={1}>
                    Humanitaria
                  </option>
                  <option value="Medicamentos" key={2}>
                    Medicamentos
                  </option>
                  <option value="Alimentos" key={3}>
                    Alimentos
                  </option>
                </Form.Control>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={editingEnvio ? editingEnvio.cantidad : ""}
                  ref={cantidad}
                />
              </Col>

              <Col>
                <Form.Label htmlFor="inputUnidadMedida">
                  Unidad de Medida
                </Form.Label>
                <Form.Control
                  as="select"
                  id="inputUnidadMedida"
                  ref={unidadMedidaId}
                  defaultValue={editingEnvio ? editingEnvio.unidadMedidaId : ""}
                >
                  <option value="" key={0}>
                    Seleccione una unidad de medida
                  </option>
                  {unidadMedidas.map((unidad) => (
                    <option
                      key={unidad.idUnidadMedida}
                      value={unidad.idUnidadMedida}
                    >
                      {unidad.unidad}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="dark" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

      <Offcanvas
        show={isDetailsOpen}
        onHide={handleCloseDetails}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Detalles del envío</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedEnvio && (
            <div>
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <strong>Id:</strong> {selectedEnvio.idEnvio}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Destino:</strong> {selectedEnvio.destino}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Fecha de envío:</strong> {selectedEnvio.fechaEnvio}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Tipo de ayuda:</strong> {selectedEnvio.tipoAyuda}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Cantidad:</strong> {selectedEnvio.cantidad}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Unidad de Medida:</strong>{" "}
                  {selectedEnvio.unidadMedidaId}
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <strong>Id:</strong> {selectedEnvio.idEnvio}
                </div>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default Envios;
