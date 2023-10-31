import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserDoctor, faUserGear, faHandHoldingDollar, faPenToSquare, faPersonCirclePlus}from "@fortawesome/free-solid-svg-icons";
import api from "../../api/axios";
import { useRef } from "react";

function Users() {

  const userName = useRef();
  const userDni = useRef();
  const userLastName1 = useRef();
  const userLastName2 = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const userPhoneNumber = useRef();
  const userDirection = useRef();
  const userSedeId = useRef();

  const [users, setUsers] = useState([]);

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
      dniUsuario: userDni.current.value,
      nombreUsuario: userName.current.value,
      apellido1: userLastName1.current.value,
      apellido2: userLastName2.current.value,
      correo: userEmail.current.value,
      clave: userPassword.current.value,
      telefono: userPhoneNumber.current.value,
      direccion: userDirection.current.value,
      sedeId: userSedeId.current.value,
    };

    api.post("Usuario",newUser).then((response) => {console.log(response)}).catch((error) => {console.log(error)});
  };

  return (
    <>
      <Container className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Usuarios</h1>
        <p className="mb-4">Lista de usuarios</p>

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
                      <Form.Label htmlFor="inputDNI">Cédula</Form.Label>
                      <Form.Control type="number" id="inputDNI" ref={userDni} />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="inputSedeId">Sede</Form.Label>
                      <Form.Control type="text" id="inputDNI" ref={userSedeId} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputName">Nombre</Form.Label>
                      <Form.Control type="text" id="inputName" ref={userName} />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="inputLastName1">
                        Primer Apellido
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="inputLastName1"
                        ref={userLastName1}
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="inputLastName2">
                        Segundo Apellido
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="inputLastName2"
                        ref={userLastName2}
                      />
                    </Col>
                  </Row>

                  <Form.Label htmlFor="inputPhoneNumber">Teléfono</Form.Label>
                  <Form.Control
                    type="number"
                    id="inputPhoneNumber"
                    ref={userPhoneNumber}
                  />
                   <Form.Label htmlFor="inputDirection">Direccion</Form.Label>
                  <Form.Control
                    type="text"
                    id="inputDirection"
                    ref={userDirection}
                  />
                  <Row>
                    <Col>
                      <Form.Label htmlFor="inputEmail">
                        Correo electrónico
                      </Form.Label>
                      <Form.Control
                        type="email"
                        id="inputEmail"
                        ref={userEmail}
                      />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="inputPassword">
                        Contraseña
                      </Form.Label>
                      <Form.Control
                        type="password"
                        id="inputPassword"
                        ref={userPassword}
                      />
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
            <Table striped="columns" id="tableUsers">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Correo Electronico</th>
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
                      <Button variant="warning" className="text-white"><FontAwesomeIcon icon={faPersonCirclePlus} /> Roles</Button>{" "}
                      <Button variant="success"><FontAwesomeIcon icon={faPenToSquare}/> Actualizar</Button> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="primary" as={Link} to="/usuario/sanitarios">
            <FontAwesomeIcon icon={faUserDoctor}/> Sanitarios
            </Button>{" "}

            <Button variant="primary" as={Link} to="/usuario/administradores">
            <FontAwesomeIcon icon={faUserGear}/> Administrador
            </Button>{" "}

            <Button variant="primary" as={Link} to="/usuario/socios">
            <FontAwesomeIcon icon={faHandHoldingDollar}/> Socios
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Users;
