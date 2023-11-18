import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Table,
  Modal,
  Form,
  Accordion,
  Row,
  Col,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import api from "../../../api/axios";

function VoluntAdministrador() {
  const idVoluntarioAdministrador = useRef(0);
  const usuarioDni = useRef(0);

  const profesionId = useRef(0);

  const [refresh, setRefresh] = useState(false);
  const [VoluntAdmininistradores, setVoluntarioAdministradores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [profesiones, setProfesiones] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVolunAdministrador, setEditingVolunAdministrador] =
    useState(null);

  useEffect(() => {
    api
      .get("VoluntarioAdministradors")
      .then((response) => {
        setVoluntarioAdministradores(response.data);
        console.log("Voluntarios", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("Usuario")
      .then((response) => {
        setUsuarios(response.data);
        console.log("Usuario", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("Profesiones")
      .then((response) => {
        setProfesiones(response.data);
        console.log("Profesiones", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [refresh]);

  const handleSave = () => {
    let newUVoluntarioAdministrador = {
      idVoluntarioAdministrador: idVoluntarioAdministrador.current.value,
      usuarioDni: usuarioDni.current.value,
    };

    let newProfesion = {
      profesionId: profesionId.current.value,
      voluntAdministradorId: idVoluntarioAdministrador.current.value,
    };

    api
      .post("VoluntarioAdministradors", newUVoluntarioAdministrador)
      .then((response) => {
        api
          .post("ProfesionVoluntarios", newProfesion)
          .then((response) => {
            Swal.fire("Éxitosamente", "Administrador ha sido guardado.", "success");
          })
          .catch((error) => {
            console.log("Nuestro JSON: ", newUser, "EL ERROR: ", error);

            Swal.fire(
              "Error!",
              "Ha habido un error al guardar el administrador, revisa la información digitada!.",
              "error"
            );
            console.log(response);
            setRefresh(!refresh);
          })
          .catch((error) => {
            console.log("Nuestro JSON: ", newProfesion, "EL ERROR: ", error);
            setRefresh(!refresh);
          });
        console.log(response);
        /* setRefresh(!refresh); */
      })
      .catch((error) => {
        console.log(
          "Nuestro JSON: ",
          newUVoluntarioAdministrador,
          "EL ERROR: ",
          error
        );
        setRefresh(!refresh);
      });
  };

  const handleUpdate = () => {
    let updatedVolunAdministrador = {
      idVoluntarioAdministrador: idVoluntarioAdministrador.current.value,
      usuarioDni: usuarioDni.current.value,
    };

    api
      .put("VoluntarioAdministradors", updatedVolunAdministrador)
      .then((response) => {
        console.log(response);

        handleCloseEditModal();
        setRefresh(!refresh);

        idVoluntarioAdministrador.current.value = "";
        usuarioDni.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (voluntarioAdministradorId) => {
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
          .delete(`VoluntarioAdministradors?Id=${voluntarioAdministradorId}`)
          .then((response) => {
            console.log(response);
            // Actualiza la lista de alimentos
            const updatedVoluntarioAdministradores =
              VoluntAdmininistradores.filter(
                (voluntAdministrador) =>
                  voluntAdministrador.idVoluntarioAdministrador !==
                  voluntarioAdministradorId
              );
            setAlimentos(updatedVoluntarioAdministradores);
          })
          .catch((error) => {
            console.error("Error al eliminar el alimento:", error);
          });
      }
    });
  };

  const handleEditModal = (voluntAdministrador) => {
    setEditingVolunAdministrador(voluntAdministrador);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditingVolunAdministrador(null);
    setShowEditModal(false);
  };

  const LinkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const match = (voluntAdministrador) => {
    const encontrado = usuarios.find(
      (usuario) => usuario.dniUsuario === voluntAdministrador.usuarioDni
    );
    return encontrado ? encontrado : "No encontrado";
  };

  return (
    <>
      <Container className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Voluntarios administradores</h1>
        <p class="mb-4">Lista de los voluntarios administradores</p>
        <div className="card shadow mb-4">
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Click en el botón para crear un usuario administrador
              </Accordion.Header>
              <Accordion.Body>
                <Container>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputIdVoluntario">
                        Id Voluntario
                      </Form.Label>
                      <Form.Control
                        type="number"
                        id="inputIdVoluntario"
                        ref={idVoluntarioAdministrador}
                      />
                    </Col>

                    <Col>
                      {/* <Form.Label htmlFor="inputUsuarioDni">Usuario</Form.Label>
                      <Form.Control
                        type="number"
                        id="inputUsuarioDni"
                        ref={usuarioDni}
                      /> */}

                      <Form.Label htmlFor="inputUsuarioDni">Usuario</Form.Label>
                      <Form.Control
                        as="select"
                        id="inputUsuarioDni"
                        ref={usuarioDni}
                      >
                        <option value=" " key={-1}>
                          Seleccione un usuario
                        </option>
                        {usuarios.map((usuario) => (
                          <option
                            value={usuario.dniUsuario}
                            key={usuario.dniUsuario}
                          >
                            {usuario.dniUsuario} -{usuario.nombreUsuario}{" "}
                            {usuario.apellido1} {usuario.apellido2}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputProfesion">
                        Profesion
                      </Form.Label>
                      <Form.Control
                        as="select"
                        id="inputProfesion"
                        ref={profesionId}
                      >
                        <option value=" " key={-1}>
                          Seleccione una profesión
                        </option>
                        {profesiones.map((profesion) => (
                          <option
                            value={profesion.idProfesion}
                            key={profesion.idProfesion}
                          >
                            {profesion.nombreProfesion}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={handleSave}
                    className="mt-3"
                  >
                    Guardar
                  </Button>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="card-body">
            <Table striped="columns">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cédula</th>
                  <th>Nombre completo</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {VoluntAdmininistradores.map((VoluntAdministrador) => (
                  <tr key={VoluntAdministrador.idVoluntarioAdministrador}>
                    <td>{VoluntAdministrador.idVoluntarioAdministrador}</td>
                    <td>{VoluntAdministrador.usuarioDni}</td>
                    <td>
                      {match(VoluntAdministrador).nombreUsuario
                        ? match(VoluntAdministrador).nombreUsuario +
                          " " +
                          match(VoluntAdministrador).apellido1 +
                          " " +
                          match(VoluntAdministrador).apellido2
                        : "No encontrado"}
                    </td>

                    <td>
                      <Button
                        variant="success"
                        className="bg-gradient-warning mr-1 text-light"
                        onClick={() => handleEditModal(VoluntAdministrador)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} /> Actualizar
                      </Button>{" "}
                      <Button
                        variant="danger"
                        className="bg-gradient-danger mr-1 text-light"
                        onClick={() =>
                          handleDelete(
                            VoluntAdministrador.idVoluntarioAdministrador
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} /> Eliminar
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
      <Link style={LinkStyle} to={"/usuario"}>
        <Button variant="dark" className="bg-gradient-danger">
          Regresar
        </Button>
      </Link>
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar voluntario administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Label>Id voluntario</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    editingVolunAdministrador
                      ? editingVolunAdministrador.idVoluntarioAdministrador
                      : ""
                  }
                  ref={idVoluntarioAdministrador}
                  readOnly
                />
              </Col>

              <Col>
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    editingVolunAdministrador
                      ? editingVolunAdministrador.usuarioDni
                      : ""
                  }
                  ref={usuarioDni}
                  readOnly
                />
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
    </>
  );
}

export default VoluntAdministrador;
