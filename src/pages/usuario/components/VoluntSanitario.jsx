import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

function VoluntSanitario() {
  const [refresh, setRefresh] = useState(false);
  const [voluntSanitarios, setVoluntarioSanitario] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [profesiones, setProfesiones] = useState([]);
  const [profesionVoluntarios, setProfesionVoluntarios] = useState([]);

  const idVoluntarioSanitario = useRef(0);
  const disponible = useRef(false);
  const usuarioDni = useRef(0);

  const profesionId = useRef(0);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVolunSanitario, setEditingVolunSanitario] = useState(null);

  useEffect(() => {
    api
      .get("VoluntarioSanitarios")
      .then((response) => {
        setVoluntarioSanitario(response.data);
        console.log("Voluntarios", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("Usuario")
      .then((response) => {
        setUsuarios(response.data);
        /* console.log("Usuario", response.data); */
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("Profesiones")
      .then((response) => {
        setProfesiones(response.data);
        /* console.log("Profesiones", response.data); */
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });

    api
      .get("ProfesionVoluntarios")
      .then((response) => {
        setProfesionVoluntarios(response.data);
        console.log("ProfesionVoluntarios", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [refresh]);

  const handleSave = () => {
    let newUVoluntarioSanitario = {
      idVoluntarioSanitario: idVoluntarioSanitario.current.value,
      disponible: disponible.current.value,
      usuarioDni: usuarioDni.current.value,
    };

    let newProfesion = {
      voluntarioSanitarioId: idVoluntarioSanitario.current.value,
      profesionId: profesionId.current.value,
    };

    api
      .post("VoluntarioSanitarios", newUVoluntarioSanitario)
      .then((response) => {
        console.log("Volunatrio Sanitario Enviado", newUVoluntarioSanitario);
        console.log(response.data);
        api
          .post("ProfesionVoluntarios", newProfesion)
          .then((response) => {
            Swal.fire("Éxitosamente", "Voluntario Sanitario ha sido guardado.", "success");
          })
          .catch((error) => {
            console.log("Nuestro JSON: ", newUser, "EL ERROR: ", error);

            Swal.fire(
              "Error!",
              "Ha habido un error al guardar Voluntario Sanitario, revisa la información digitada!.",
              "error"
            );
            console.log(response.data);
            console.log("Profesion Enviada", newProfesion);
            setRefresh(!refresh);
          })
          .catch((error) => {
            console.log("Nuestro JSON: ", newProfesion, "EL ERROR: ", error);
            /* setRefresh(!refresh); */
          });
      })
      .catch((error) => {
        console.log(
          "Nuestro JSON: ",
          newUVoluntarioSanitario,
          "EL ERROR: ",
          error
        );
        /* setRefresh(!refresh); */
      });

    idVoluntarioSanitario.current.value = "";
    disponible.current.value = "";
    usuarioDni.current.value = "";
    profesionId.current.value = "";
  };

  const handleUpdate = () => {
    let updatedVolunSanitario = {
      idVoluntarioSanitario: idVoluntarioSanitario.current.value,
      disponible: disponible.current.value,
      usuarioDni: usuarioDni.current.value,
    };

    api
      .put("VoluntarioSanitarios", updatedVolunSanitario)
      .then((response) => {
        console.log(response);

        handleCloseEditModal();
        setRefresh(!refresh);

        idVoluntarioSanitario.current.value = "";
        disponible.current.value = "";
        usuarioDni.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (voluntarioSanitarioId) => {
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
          .delete(`VoluntarioSanitarios?Id=${voluntarioSanitarioId}`)
          .then((response) => {
            console.log(response);
            // Actualiza la lista de alimentos
            const updatedVoluntarioSanitarios = VoluntSanitarios.filter(
              (VoluntSanitario) =>
                VoluntSanitario.idVoluntarioSanitario !== voluntarioSanitarioId
            );
            setAlimentos(updatedVoluntarioSanitarios);
          })
          .catch((error) => {
            console.error("Error al eliminar:", error);
            setRefresh(!refresh);
          });
      }
    });
    setRefresh(!refresh);
  };

  const handleEditModal = (voluntSanitario) => {
    setEditingVolunSanitario(voluntSanitario);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditingVolunSanitario(null);
    setShowEditModal(false);
  };

  const LinkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const match = (voluntSanitario) => {
    const encontrado = usuarios.find(
      (usuario) => usuario.dniUsuario === voluntSanitario.usuarioDni
    );
    return encontrado ? encontrado : "No encontrado";
  };

  function joinTablesForVoluntario(voluntario) {
    // Unir profesionesVoluntarios con profesiones
    const joinedData = profesionVoluntarios
      .filter(
        (profesionVoluntario) =>
          profesionVoluntario.voluntarioSanitarioId ===
          voluntario.idVoluntarioSanitario
      )
      .map((profesionVoluntario) => {
        const profesion = profesiones.find(
          (prof) => prof.idProfesion === profesionVoluntario.profesionId
        );

        /*         console.log(`Voluntario: ${match(voluntario).nombreUsuario}`,{idProfesionVoluntario: profesionVoluntario.idProfesionVoluntario,
          profesion: profesion ? { ...profesion } : null,
          voluntarioSanitario: voluntario ? { ...voluntario } : null,}) */

        return {
          idProfesionVoluntario: profesionVoluntario.idProfesionVoluntario,
          profesion: profesion ? { ...profesion } : null,
          voluntarioSanitario: voluntario ? { ...voluntario } : null,
        };
      });

    return joinedData;
  }

  return (
    <>
      <Container className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Voluntarios Sanitarios</h1>
        <p class="mb-4">Lista de los voluntarios sanitarios</p>
        <div className="card shadow mb-4">
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Click en el botón para crear un usuario
              </Accordion.Header>
              <Accordion.Body>
                <Container>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputDNI">Id Voluntario</Form.Label>
                      <Form.Control
                        type="number"
                        id="inputDNI"
                        ref={idVoluntarioSanitario}
                      />
                    </Col>

                    <Col>
                      <Form.Label htmlFor="inputUsuario">Usuario</Form.Label>
                      <Form.Control
                        as="select"
                        id="inputUsuario"
                        ref={usuarioDni}
                      >
                        <option value=" " key={-1}>
                          {" "}
                          Seleccione un usuario
                        </option>
                        {usuarios.map((usuario) => (
                          <option
                            value={usuario.dniUsuario}
                            key={usuario.dniUsuario}
                          >
                            {usuario.dniUsuario} - {usuario.nombreUsuario}{" "}
                            {usuario.apellido1} {usuario.apellido2}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col>
                      <Form.Label htmlFor="inputDisponible">
                        Disponibilidad
                      </Form.Label>
                      <Form.Control
                        as="select"
                        id="inputDisponible"
                        ref={disponible}
                      >
                        <option value={true}>Seleccione una opción</option>
                        <option value={true}>Disponible</option>
                        <option value={false}>No disponible</option>
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
                          Selecciones una profesión
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
                  <th>Profesión</th>
                  <th>Disponibilidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {voluntSanitarios.map((voluntSanitario) => (
                  <tr key={voluntSanitario.idVoluntarioSanitario}>
                    <td>{voluntSanitario.idVoluntarioSanitario}</td>
                    <td>{voluntSanitario.usuarioDni}</td>
                    <td>
                      {match(voluntSanitario).nombreUsuario
                        ? match(voluntSanitario).nombreUsuario +
                          " " +
                          match(voluntSanitario).apellido1 +
                          " " +
                          match(voluntSanitario).apellido2
                        : "No encontrado"}
                    </td>
                    <td>
                      {joinTablesForVoluntario(voluntSanitario).map(
                        (joinedData, index) => (
                          <span key={index}>
                            {joinedData.profesion
                              ? joinedData.profesion.nombreProfesion
                              : "Sin profesión"}
                            {index <
                              joinTablesForVoluntario(voluntSanitario).length -
                                1 && ", "}
                          </span>
                        )
                      )}
                    </td>
                    <td>
                      {voluntSanitario.disponible
                        ? "Disponible"
                        : "No disponible"}
                    </td>

                    <td>
                      <Button
                        variant="success"
                        className="bg-gradient-warning mr-1 text-light"
                        onClick={() => handleEditModal(voluntSanitario)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} /> Actualizar
                      </Button>{" "}
                      <Button
                        variant="danger"
                        className="bg-gradient-danger mr-1 text-light"
                        onClick={() =>
                          handleDelete(voluntSanitario.idVoluntarioSanitario)
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
          <Modal.Title>Editar voluntario sanitario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Label>Id voluntario</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    editingVolunSanitario
                      ? editingVolunSanitario.idVoluntarioSanitario
                      : ""
                  }
                  ref={idVoluntarioSanitario}
                  readOnly
                />
              </Col>

              <Col>
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    editingVolunSanitario
                      ? editingVolunSanitario.usuarioDni
                      : ""
                  }
                  ref={usuarioDni}
                  readOnly
                />
              </Col>

              <Col>
                <Form.Label htmlFor="inputDisponible">
                  Disponibilidad
                </Form.Label>
                <Form.Control
                  as="select"
                  id="inputDisponible"
                  ref={disponible}
                  defaultValue={
                    editingVolunSanitario
                      ? editingVolunSanitario.disponible
                      : ""
                  }
                >
                  <option value=" " key={-1}>
                    Seleccione una opción
                  </option>
                  <option value={true}>Disponible</option>
                  <option value={false}>No disponible</option>
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
    </>
  );
}

export default VoluntSanitario;
