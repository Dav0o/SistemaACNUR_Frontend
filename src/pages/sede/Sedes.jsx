import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import api from "../../api/axios";

import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { useRef, useState, useEffect } from "react";

import React from 'react'

function Sedes() {
  const idSede = useRef();
  const direccionId = useRef();
  const pais = useRef();
  const ciudad = useRef();
  const estado = useRef();
  const direccionExacta = useRef();

  const [sedes, setSedes] = useState([]);


  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSede, setEditingSede] = useState(null);

  // Muestra los detalles de la sede
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSedeDetails, setSelectedSedeDetails] = useState(null);

  

  useEffect(() => {

    api
      .get("Sedes")
      .then((response) => {
        setSedes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);


  const handleSave = () => {
    let newDireccion = {
      idDireccion: direccionId.current.value,
      pais: pais.current.value,
      ciudad: ciudad.current.value,
      estado: estado.current.value,
      direccionExacta: direccionExacta.current.value,
    };
    let newSede = {
      idSede: idSede.current.value,
      direccionId: direccionId.current.value,
    };


    console.log(newSede);
    console.log(newDireccion);

    api
      .post("Direccions", newDireccion)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .post("Sedes", newSede)
      .then((response) => {
        console.log(response);
        fetchSedes();
      })
      .catch((error) => {
        console.log(error);
      });

      direccionId.current.value = ""
      pais.current.value = ""
      ciudad.current.value = ""
      estado.current.value = ""
      direccionExacta.current.value = ""
      idSede.current.value = ""
      direccionId.current.value = "" 
  };


  const handleEditClick = (sede) => {
    setEditingSede(sede);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdate = () => {
    const updatedSede = {
      idSede: editingSede.idSede,
      direccionId: direccionId.current.value,
      direccion: {
        idDireccion: direccionId.current.value,
        pais: pais.current.value,
        ciudad: ciudad.current.value,
        estado: estado.current.value,
        direccionExacta: direccionExacta.current.value,
      },
    };

    const updateSedePromise = api.put(`Sedes`, updatedSede);
    const updateDireccionPromise = api.put(`Direccions`, updatedSede.direccion);

    Promise.all([updateSedePromise, updateDireccionPromise])
      .then((responses) => {
        Swal.fire({
          title: "¡Actualizado!",
          text: "La Sede ha sido actualizada correctamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          console.log(responses);
          setShowEditModal(false);
          setEditingSede(null);
          window.location.reload(); 
        });
      })
      .catch((errors) => {
        console.error("Error al actualizar la sede o dirección:", errors);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar la sede o dirección.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };

  const handleDelete = (sedeId) => {
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
          .delete(`Sedes?Id=${sedeId}`)
          .then((response) => {
            console.log(response);

            const updatedSedes = sedes.filter((sede) => sede.idSede !== sedeId);
            setSedes(updatedSedes);
            window.location.reload(); 
          })
          .catch((error) => {
            console.error("Error al eliminar la sede:", error);
          });
      }
    });
  };

  const handleDetailsClick = (sede) => {
    setSelectedSedeDetails(sede);
    setShowDetailsModal(true);
  };


  return (
    <>
     <Container className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Sedes</h1>
      <p className="mb-4">Lista de las sedes</p>

      <div className="card shadow mb-4">
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Click en el botón para crear una sede
            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputSedeId">Sede</Form.Label>
                    <Form.Control type="text" id="inputSedeId" ref={idSede} />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputDireccionId">
                      Dirección Id
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="inputDireccionId"
                      ref={direccionId}
                    />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputPais">Pais</Form.Label>
                    <Form.Control type="text" id="inputPais" ref={pais} />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputCiudad">Ciudad</Form.Label>
                    <Form.Control type="text" id="inputCiudad" ref={ciudad} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputEstado">Estado</Form.Label>
                    <Form.Control type="text" id="inputEstado" ref={estado} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputdireccionExacta">
                      Direccion Exacta
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="inputdireccionExacta"
                      ref={direccionExacta}
                    />
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
          <Table striped="columns" id="tableSedes">
            <thead>
              <tr>
                <th>Id</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sedes.map((sede) => (
                <tr key={sede.idSede}>
                  <td>{sede.idSede}</td>
                  <td>{sede.direccion.pais}</td>
                  <td>{sede.direccion.ciudad}</td>
                  <td>{sede.direccion.estado}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleDelete(sede.idSede)}
                    >
                     <FontAwesomeIcon icon={faPenToSquare} /> Actualizar
                    </Button> {" "}

                    <Button
                      variant="danger"
                      onClick={() => handleEditClick(sede)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </Button> {" "}

                    <Button
                      variant="info"
                      className="text-white"
                      onClick={() => handleDetailsClick(sede)}
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

      {/* Modal para editar */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Sede</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>idSede</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la id de la sede"
              defaultValue={editingSede ? editingSede.idSede : ""}
              ref={idSede}
              disabled
            />

            <Form.Label>idDireccion</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese la id de la direccion"
              defaultValue={editingSede ? editingSede.direccionId : ""}
              ref={direccionId}
              disabled
            />
            <Form.Label>Pais</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el pais"
              defaultValue={editingSede ? editingSede.direccion.pais : ""}
              ref={pais}
            />
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la ciudad"
              defaultValue={editingSede ? editingSede.direccion.ciudad : ""}
              ref={ciudad}
            />
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el estado"
              defaultValue={editingSede ? editingSede.direccion.estado : ""}
              ref={estado}
            />
            <Form.Label>Direccion Exacta</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la direccion exacta"
              defaultValue={
                editingSede ? editingSede.direccion.direccionExacta : ""
              }
              ref={direccionExacta}
            />
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

      {/* m0da1 para detalles */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Sede</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSedeDetails && (
            <div>
              <h4>ID de Sede: {selectedSedeDetails.idSede}</h4>
              <h5>Detalles de Dirección:</h5>
              <p>
                ID de Dirección: {selectedSedeDetails.direccion.idDireccion}
              </p>
              <p>País: {selectedSedeDetails.direccion.pais}</p>
              <p>Ciudad: {selectedSedeDetails.direccion.ciudad}</p>
              <p>Estado: {selectedSedeDetails.direccion.estado}</p>
              <p>
                Dirección Exacta:{" "}
                {selectedSedeDetails.direccion.direccionExacta}
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
    </>
  );
}

export default Sedes;

