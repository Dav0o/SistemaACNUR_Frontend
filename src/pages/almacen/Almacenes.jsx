import { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAppleWhole, faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";




function Almacenes() {

  const idAlmacen = useRef();
  const nombreAlmacen = useRef();
  const descripcionAlmacen = useRef();
  const sedeId = useRef();

  const [almacen, setAlmacenes] = useState([]);

  useEffect(() => {
    api
      .get("almacens")
      .then((response) => {
        setAlmacenes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const handleSave = () => {
    let newAlmacen = {

       idAlmacen: idAlmacen.current.value,
      nombreAlmacen: nombreAlmacen.current.value,
      descripcionAlmacen: descripcionAlmacen.current.value,
      sedeId: sedeId.current.value, 

    };

    api.post("Almacens",newAlmacen).then((response) => {console.log(response)}).catch((error) => {console.log(error)});
  };



  return (
    <Container className="container-fluid">
    <h1 className="h3 mb-2 text-gray-800">Almacenes</h1>
    <p className="mb-4">Lista de los almacenes</p>

    <div className="card shadow mb-4">
    <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Click aquí para crear un almacen
              </Accordion.Header>
              <Accordion.Body>
                <Container>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputIdAlmace">Id Almacén</Form.Label>
                      <Form.Control type="number" id="inputIdAlmacen" ref={idAlmacen} />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="inputNombreAlmacen">Nombre</Form.Label>
                      <Form.Control type="text" id="inputNombreAlmacen" ref={nombreAlmacen} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputDescripcionAlmacen">Descripción</Form.Label>
                      <Form.Control type="text" id="inputDescripcionAlmacen" ref={descripcionAlmacen} />
                    </Col>
                    <Col>
                      <Form.Label htmlFor="inputSedeId"> Sede </Form.Label>
                      <Form.Control type="text" id="inputSedeId" ref={sedeId}/>
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
        <Table striped="columns" id="tableAlmacen">
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Sede</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {almacene.map((almacen) => (
              <tr key={almacen.idAlmacen}>
                <td>{almacen.idAlmacen}</td>
                <td>{almacen.nombreAlmacen}</td>
                <td>{almacen.descripcionAlmacen}</td>
                <td>{almacen.sedeId}</td>
                <td>
                  <Button variant="primary" as={Link} to={`/almacen/inventarioAlimento/${almacen.idAlmacen}`}>
                  <FontAwesomeIcon icon={faAppleWhole}/> Alimentos 
                  </Button>{" "}
                  <Button variant="primary" as={Link} to={`/almacen/inventarioMedicina/${almacen.idAlmacen}`}>
                  <FontAwesomeIcon icon={faBriefcaseMedical}/> Medicinas
                   
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  </Container>

  )
}

export default Almacenes

