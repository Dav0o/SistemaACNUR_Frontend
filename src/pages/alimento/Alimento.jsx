import React, { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import api from "../../api/axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/Offcanvas";

function Alimento() {
  const idAlimento = useRef();
  const nombreAlimento = useRef();
  const fechaVencimiento = useRef();
  const peso = useRef();
  const unidad = useRef();

  const [alimentos, setAlimentos] = useState([]);
  const [editingAlimento, setEditingAlimento] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAlimento, setSelectedAlimento] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    api
      .get("Alimentos")
      .then((response) => {
        setAlimentos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const handleSave = () => {
    let newAlimento = {
      idAlimento: idAlimento.current.value,
      nombreAlimento: nombreAlimento.current.value,
      fechaVencimiento: fechaVencimiento.current.value,
      peso: peso.current.value,
      unidad: unidad.current.value,
    };

    console.log(newAlimento);

    api
      .post("Alimentos", newAlimento)
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "Éxito",
          text: "¡Alimento guardado exitosamente!",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al guardar el alimento.",
          icon: "error",
        });
      });
  };

  //////////////////////----------update------------///////////////////////////7

  const handleEditClick = (alimento) => {
    setEditingAlimento(alimento);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingAlimento(null);
  };

  const handleUpdate = () => {
    const updatedAlimento = {
      idAlimento: editingAlimento.idAlimento,
      nombreAlimento: nombreAlimento.current.value,
      fechaVencimiento: fechaVencimiento.current.value,
      peso: peso.current.value,
      unidad: unidad.current.value,
    };

    api
      .put("Alimentos", updatedAlimento)
      .then((response) => {
        Swal.fire({
          title: "¡Actualizado!",
          text: "El alimento ha sido actualizado correctamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          console.log(response);
          setShowEditModal(false);
          setEditingAlimento(null);
        });
      })
      .catch((error) => {
        console.error("Error al actualizar el alimento:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar el alimento.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };
  ///////////////////---------------------------------//////////////////////////////

  //////////////////////----------delete------------///////////////////////////7

  const handleDelete = (alimentoId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`Alimentos?Id=${alimentoId}`)
          .then((response) => {
            console.log(response);
            // Actualiza la lista de alimentos
            const updatedAlimentos = alimentos.filter(
              (alimento) => alimento.idAlimento !== alimentoId
            );
            setAlimentos(updatedAlimentos);
          })
          .catch((error) => {
            console.error("Error al eliminar el alimento:", error);
          });
      }
    });
  };
  ///////////////////---------------------------------//////////////////////////////

  ///////////////////---------------Details-------------//////////////////////////////

  const handleDetailsClick = (alimento) => {
    setSelectedAlimento(alimento);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  ///////////////////---------------------------------//////////////////////////////

  return (
    <Container className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Alimentos</h1>
      <p className="mb-4">Lista de los alimentos</p>

      <div className="card shadow mb-4">
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Click en el botón para crear un alimento
            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputIdAlimento">
                      Id Alimento
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="inputIdAlimento"
                      ref={idAlimento}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputNombreAlimento">
                      Nombre
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="inputNombreAlimento"
                      ref={nombreAlimento}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputFechaVencimiento">
                      Fecha Vencimiento
                    </Form.Label>
                    <Form.Control
                      type="date"
                      id="inputFechaVencimiento"
                      ref={fechaVencimiento}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputPeso">Peso</Form.Label>
                    <Form.Control type="number" id="inputPeso" ref={peso} />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputUnidad">Unidad</Form.Label>
                    <Form.Control type="text" id="inputUnidad" ref={unidad} />
                  </Col>
                </Row>
                <Button variant="primary" onClick={handleSave} className="mt-3">
                  Guardar
                </Button>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="card-body">
          <Table striped="columns" id="tableAlimento">
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Fecha de Vencimiento</th>
                <th>Peso</th>
                <th>Unidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alimentos.map((alimento) => (
                <tr key={alimento.idAlimento}>
                  <td>{alimento.idAlimento}</td>
                  <td>{alimento.nombreAlimento}</td>
                  <td>{alimento.fechaVencimiento}</td>
                  <td>{alimento.peso}</td>
                  <td>{alimento.unidad}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleEditClick(alimento)}
                    >
                     <FontAwesomeIcon icon={faPenToSquare} /> Actualizar
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(alimento.idAlimento)}
                    >
                     <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </Button>{" "}
                    <Button
                      variant="info"
                      className="text-white"
                      onClick={() => handleDetailsClick(alimento)}
                    >
                    <FontAwesomeIcon icon={faCircleInfo} /> Detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Alimento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                defaultValue={
                  editingAlimento ? editingAlimento.nombreAlimento : ""
                }
                ref={nombreAlimento}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha Vencimiento</Form.Label>
              <Form.Control
                type="text"
                defaultValue={
                  editingAlimento ? editingAlimento.fechaVencimiento : ""
                }
                ref={fechaVencimiento}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Peso</Form.Label>
              <Form.Control
                type="number"
                defaultValue={editingAlimento ? editingAlimento.peso : ""}
                ref={peso}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Unidad</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editingAlimento ? editingAlimento.unidad : ""}
                ref={unidad}
              />
            </Form.Group>
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
          <Offcanvas.Title>Detalles del Alimento</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedAlimento && (
            <div>
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <strong>ID:</strong> {selectedAlimento.idAlimento}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Nombre:</strong> {selectedAlimento.nombreAlimento}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Fecha de Vencimiento:</strong>{" "}
                  {selectedAlimento.fechaVencimiento}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Peso:</strong> {selectedAlimento.peso}
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <strong>Unidad:</strong> {selectedAlimento.unidad}
                </div>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default Alimento;
