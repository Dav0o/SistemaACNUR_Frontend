import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import UsuarioRol from "./components/UsuarioRol";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faUserGear,
  faHandHoldingDollar,
  faPenToSquare,
  faPersonCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../api/axios";
import { useRef } from "react";

function Users() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dniUsuario = useRef(0);
  const nombreUsuario = useRef(null);
  const apellido1 = useRef(null);
  const apellido2 = useRef(null);
  const correo = useRef(null);
  const clave = useRef(null);
  const telefono = useRef(0);
  const direccion = useRef(null);
  const sedeId = useRef(null);

  const [users, setUsers] = useState([]);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    api
      .get("Usuario")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const handleSave = () => {
    let newUser = {
      dniUsuario: dniUsuario.current.value,
      nombreUsuario: nombreUsuario.current.value,
      apellido1: apellido1.current.value,
      apellido2: apellido2.current.value,
      correo: correo.current.value,
      clave: clave.current.value,
      telefono: telefono.current.value,
      direccion: direccion.current.value,
      sedeId: sedeId.current.value,
    };

    api
      .post("Usuario", newUser)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Nuestro JSON: ", newUser, "EL ERROR: ", error);
      });
  };

  return (
    <>
      <Container className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Usuarios</h1>
        <p className="mb-4">Lista de usuarios</p>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Click en el botón para crear un usuario
            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputDNI">Cédula</Form.Label>
                    <Form.Control
                      type="number"
                      id="inputDNI"
                      ref={dniUsuario}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputSedeId">Sede</Form.Label>
                    <Form.Control type="text" id="inputDNI" ref={sedeId} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputNombreUsuario">Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      id="inputNombreUsuario"
                      ref={nombreUsuario}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputApellido1">
                      Primer Apellido
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="inputApellido1"
                      ref={apellido1}
                    />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputApellido2">
                      Segundo Apellido
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="inputApellido2"
                      ref={apellido2}
                    />
                  </Col>
                </Row>

                <Form.Label htmlFor="inputTelefono">Teléfono</Form.Label>
                <Form.Control type="text" id="inputTelefono" ref={telefono} />
                <Form.Label htmlFor="inputDireccion">Direccion</Form.Label>
                <Form.Control type="text" id="inputDireccion" ref={direccion} />
                <Row>
                  <Col>
                    <Form.Label htmlFor="inputEmail">
                      Correo electrónico
                    </Form.Label>
                    <Form.Control type="email" id="inputEmail" ref={correo} />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputPassword">Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      id="inputPassword"
                      ref={clave}
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo Electrónico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.dniUsuario}>
                <td>{user.dniUsuario}</td>
                <td>{user.nombreUsuario}</td>
                <td>
                  {user.apellido1} {user.apellido2}
                </td>
                <td>{user.correo}</td>
                <td>
                  <Button
                    variant="warning"
                    className="text-white"
                    onClick={() => handleShowModal(user)}
                  >
                    <FontAwesomeIcon icon={faPersonCirclePlus} /> Roles
                  </Button>{" "}
                  <Button variant="success">
                    <FontAwesomeIcon icon={faPenToSquare} /> Actualizar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" as={Link} to="/usuario/sanitarios">
          <FontAwesomeIcon icon={faUserDoctor} /> Sanitarios
        </Button>{" "}
        <Button variant="primary" as={Link} to="/usuario/administradores">
          <FontAwesomeIcon icon={faUserGear} /> Administrador
        </Button>{" "}
        <Button variant="primary" as={Link} to="/usuario/socios">
          <FontAwesomeIcon icon={faHandHoldingDollar} /> Socios
        </Button>
        <Modal show={showModal} onHide={handleHideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Definir rol al usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser ? (
              <UsuarioRol user={selectedUser} />
            ) : (
              <div>No hay usuario seleccionado</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Users;
