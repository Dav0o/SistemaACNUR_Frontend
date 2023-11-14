import { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Accordion } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import api from "../../api/axios";
import Modal from "react-bootstrap/Modal";

function Envios() {
  const [refresh, setRefresh] = useState(false);
  const [envios, setEnvios] = useState([]);
  const [unidadMedidas, setUnidadMedidas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEnvio, setEditingEnvio] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsEnvio, setDetailsEnvio] = useState({});

  const idEnvio = useRef(null);
  const destino = useRef(null);
  const fechaEnvio = useRef(null);
  const tipoAyuda = useRef(null);
  const cantidad = useRef(null);
  const unidadMedidaId = useRef(null);

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

    api
      .post("Envios", newEnvio)
      .then((response) => {
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

  //Modal Detalles
  const handleDetailsModal = async (envio) => {
    try {
      const response = await api.get(`Envios/${envio.idEnvio}`);
      setDetailsEnvio(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error al obtener detalles del envío:", error);
    }
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailsEnvio({});
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
                    Actualizar
                  </Button>{" "}
                  <Button
                    variant="info"
                    key={`detalles-${envio.idEnvio}`}
                    onClick={() => handleDetailsModal(envio)}
                    className="mt-3"
                  >
                    Detalles
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

      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del envío</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <strong>ID de Envío:</strong> {detailsEnvio.idEnvio ?? " "}
              </Col>
              <Col>
                <strong>Destino:</strong> {detailsEnvio.destino ?? " "}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Fecha de Envío:</strong>{" "}
                {detailsEnvio.fechaEnvio ?? " "}
              </Col>
              <Col>
                <strong>Tipo de Ayuda:</strong> {detailsEnvio.tipoAyuda ?? " "}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Cantidad:</strong> {detailsEnvio.cantidad ?? " "}{" "}
                {detailsEnvio.unidadMedida?.unidad ?? " "}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseDetailsModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Envios;
