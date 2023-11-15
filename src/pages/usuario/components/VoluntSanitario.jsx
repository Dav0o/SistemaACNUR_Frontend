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
import api from "../../../api/axios";

function VoluntSanitario() {
  const [refresh, setRefresh] = useState(false);
  const [voluntSanitarios, setVoluntarioSanitario] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [profesiones, setProfesiones] = useState([]);

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
    let newUVoluntarioSanitario = {
      idVoluntarioSanitario: idVoluntarioSanitario.current.value,
      disponible: disponible.current.value,
      usuarioDni: usuarioDni.current.value,
    };

    let newProfesion = {
      profesionId: profesionId.current.value,
      voluntSanitarioId: idVoluntarioSanitario.current.value,
    };
    
    api
      .post("VoluntarioSanitarios", newUVoluntarioSanitario)
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(
          "Nuestro JSON: ",
          newUVoluntarioSanitario,
          "EL ERROR: ",
          error
        );
        setRefresh(!refresh);
      });

    api
      .post("ProfesionVoluntarios", newProfesion)
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(
          "Nuestro JSON: ",
          newProfesion,
          "EL ERROR: ",
          error
        );
        setRefresh(!refresh);
      });
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

  const hanldelDelete = (id) => {

    api
      .delete("VoluntarioSanitarios/")
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

const handleEditModal = (voluntSanitario) => {
    setEditingVolunSanitario(voluntSanitario);
    setShowEditModal(true);
  }

const handleCloseEditModal = () => {
    setEditingVolunSanitario(null);
    setShowEditModal(false);
  }

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
                      <Form.Label htmlFor="inputSedeId">Cédula</Form.Label>
                      <Form.Control
                        type="number"
                        id="inputDNI"
                        ref={usuarioDni}
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
                      >
                        <option value={true}>Disponible</option>
                        <option value={false}>No disponible</option>
                      </Form.Control>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                  <Col>
                      <Form.Label htmlFor="inputDisponible">
                        Profesion
                      </Form.Label>
                      <Form.Control
                        as="select"
                        id="inputDisponible"
                        ref={profesionId}
                      >
                        <option value=" " key={-1}>Selecciones una Profesion</option>
                        {profesiones.map((profesion) => (
                          <option value={profesion.idProfesion} key={profesion.idProfesion}>
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
                  <th>Nombre</th>
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
                      {match(voluntSanitario).nombreUsuario ?? "No encontrado"}
                    </td>
                    <td>
                      {voluntSanitario.disponible
                        ? "Disponible"
                        : "No disponible"}
                    </td>

                    <td>
                      <Button
                        variant="warning"
                        className="bg-gradient-warning mr-1 text-light"
                        onClick={
                          () => handleEditModal(voluntSanitario)
                        }
                      >
                        <i class="bi bi-pencil-square"></i>
                      </Button>{" "}
                      <Button
                        variant="danger"
                        className="bg-gradient-danger mr-1 text-light"
                        onClick={() =>
                          hanldelDelete(voluntSanitario.idVoluntarioSanitario)
                        }
                      >
                        <i class="bi bi-trash"></i>
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
                      editingVolunSanitario ? editingVolunSanitario.idVoluntarioSanitario : ""
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
                      editingVolunSanitario ? editingVolunSanitario.usuarioDni : ""
                    }
                    ref={usuarioDni}
                    readOnly
                  />
                </Col>

                <Col>
                  <Form.Label htmlFor="inputDisponible">Disponibilidad</Form.Label>
                  <Form.Control
                    as="select"
                    id="inputDisponible"
                    ref={disponible}
                    defaultValue={editingVolunSanitario ? editingVolunSanitario.disponible : ""}
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
