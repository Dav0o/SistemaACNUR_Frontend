import { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Accordion } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import api from "../../api/axios";
import Modal from "react-bootstrap/Modal";

function Envios() {
  const [envios, setEnvios] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [unidadMedidas, setUnidadMedidas] = useState([]);
  const [selectedEnvio, setSelectedEnvio] = useState(null);

  const idEnvio = useRef();
  const destino = useRef();
  const fechaEnvio = useRef();
  const tipoAyuda = useRef();
  const cantidad = useRef();
  const unidadMedidaId = useRef();

  useEffect(() => {
    api
      .get("Envios")
      .then((response) => {
        setEnvios(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("UnidadMedidas")
      .then((response) => {
        setUnidadMedidas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingEnvio(null);
  };

  const handleSave = () => {
    let newEnvio = {
      idEnvio: idEnvio.current.value,
      destino: destino.current.value,
      fechaEnvio: fechaEnvio.current.value,
      tipoAyuda: tipoAyuda.current.value,
      cantidad: cantidad.current.value,
      unidadMedidaId: unidadMedidaId.current.value,
    };

    console.log(newEnvio);

    api
      .post("Envios", newEnvio)
      .then((response) => {
        console.log(response);
        setEnvios((prevEnvios) => [...prevEnvios, response.data]);
      })
      .catch((error) => {
        console.log(newEnvio);
        console.log(error);
      });
  };

  const handleUpdate = (updatedEnvio) => {
    api
      .put(`Envios/${updatedEnvio.idEnvio}`, updatedEnvio)
      .then((response) => {
        console.log(response);
        // Assuming the API response contains the updated Envio, update it in the local state
      })
      .catch((error) => {
        console.log(error);
      });

    setShowEditModal(false);
  };

  const handleDetails = (envio) => {
    // Set the selected Envio for editing
    setEditingEnvio(envio);
    setShowEditModal(true);
  };

  const [editingEnvio, setEditingEnvio] = useState(null);

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
                  <Col>
                    <Form.Label htmlFor="inputDestino">Destino</Form.Label>
                    <Form.Control type="text" id="inputDestino" ref={destino} />
                  </Col>
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
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputTipoAyuda">
                      Tipo de ayuda
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="inputTipoAyuda"
                      ref={tipoAyuda}
                    />
                  </Col>
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
                    onClick={() => handleDetails(envio)}
                    className="mt-3"
                  >
                    Actualizar
                  </Button>{" "}
                  <Button
                    variant="info"
                    onClick={() => handleUpdate(envio)}
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
                  ref={destino}
                />

                <Form.Label>Destino</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={editingEnvio ? editingEnvio.destino : ""}
                  ref={destino}
                />

                <Form.Label>Fecha de envío</Form.Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue={editingEnvio ? editingEnvio.fechaEnvio : ""}
                  ref={fechaEnvio}
                />

                <Form.Label>Tipo de ayuda</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={editingEnvio ? editingEnvio.tipoAyuda : ""}
                  ref={tipoAyuda}
                />
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
    </Container>
  );
}

export default Envios;
