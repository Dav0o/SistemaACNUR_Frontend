import React, { useRef, useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import api from "../../api/axios";
function Medicinas() {
  

  const idMedicina = useRef();
  const nombreMedicina = useRef();
  const fechaVencimiento = useRef();


  const [medicinas, setMedicinas] = useState([]);

  useEffect(() => {
    api
      .get("Medicinas")
      .then((response) => {
        setMedicinas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [medicinas]);

  const handleSave = () => {
    let newMedicina = {
      idMedicina: idMedicina.current.value,
      nombreMedicina: nombreMedicina.current.value,
      fechaVencimiento: fechaVencimiento.current.value
    };

    console.log(newMedicina);

    api.post("Medicinas", newMedicina)
      .then((response) => {console.log(response)})
      .catch((error) => {console.log(error)});
  };



  return (
    <Container className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Medicinas</h1>
      <p className="mb-4">Lista de las medicinas</p>

      <div className="card shadow mb-4">
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Click aquí para crear un medicamento
            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputIdMedicina">Id Medicina</Form.Label>
                    <Form.Control type="text" id="inputIdMedicina" ref={idMedicina} />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputNombreMedicina">Nombre</Form.Label>
                    <Form.Control type="text" id="inputNombreMedicina" ref={nombreMedicina} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputFechaVencimiento">Fecha Vencimiento</Form.Label>
                    <Form.Control type="date" id="inputFechaVencimiento" ref={fechaVencimiento} />
                  </Col>
                </Row>
                <Row>
                  {""}
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicinas.map((medicina) => (
                <tr key={medicina.idMedicina}>
                  <td>{medicina.idMedicina}</td>
                  <td>{medicina.nombreMedicina}</td>
                  <td>{medicina.fechaVencimiento}</td>
                  <td>
                    <Button variant="danger">Eliminar</Button>{" "}
                    <Button variant="success">Actualizar</Button>{" "}
                    <Button variant="info">Detalles</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
}

export default Medicinas

 