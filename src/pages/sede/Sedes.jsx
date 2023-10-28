import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import api from "../../api/axios";
import { useRef, useState, useEffect} from "react";

function Sedes() {

const sedeId = useRef();
const direccionId = useRef();




const [sedes, setSedes] = useState([]);

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
    let newSede = {
      id: sedeId.current.value,
      direccion: direccionId.current.value,
    };

    api.post(newSede);
  };



  return (
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
                    <Form.Control type="number" id="inputSedeId" ref={sedeId} />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputDireccionId">Dirección</Form.Label>
                    <Form.Control type="text" id="inputDireccionId" ref={direccionId} />
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
         {/*  <Table striped="columns" id="tableSedes">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sedes.map((sede) => (
                <tr key={sede.id}>
                  <td>{sede.id}</td>
                  <td>{sede.nombre}</td>
                  <td>{sede.direccion.pais}</td>
                  <td>{sede.direccion.ciudad}</td>
                  <td>{sede.direccion.estado}</td>
                  <td>
                    <Button variant="danger">Eliminar</Button>{" "}
                    <Button variant="success">Actualizar</Button>{" "}
                    <Button variant="info">Detalles</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}
        </div>
      </div>
    </Container>
  );
}

export default Sedes;


 /*  const sedes = [
    {
      id: "Sede 1",
      nombre: "Sede Rolo",
      direccion: {
        pais: "Colombia",
        ciudad: "Bogotá",
        estado: "Cundinamarca",
      },
    },
    {
      id: "Sede 2",
      nombre: "Sede Paisa",
      direccion: {
        pais: "Colombia",
        ciudad: "Medellín",
        estado: "Antioquia",
      },
    },
    {
      id: "Sede 3",
      nombre: "Sede Chepe",
      direccion: {
        pais: "Costa Rica",
        ciudad: "San José",
        estado: "San José",
      },
    },
  ]; */