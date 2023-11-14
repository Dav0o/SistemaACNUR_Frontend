import React, { useRef, useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import api from "../../api/axios";

function Alimento() {

  const idAlimento = useRef();
  const nombreAlimento = useRef();
  const fechaVencimiento = useRef();
  const pesoKg = useRef();

  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    api
      .get("Alimentos")
      .then((response) => {
        setAlimentos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [alimentos]);

  const handleSave = () => {
    let newAlimento = {
      idAlimento: idAlimento.current.value,
      nombreAlimento: nombreAlimento.current.value,
      fechaVencimiento: fechaVencimiento.current.value,
      pesoKg: pesoKg.current.value
    };

    console.log(newAlimento);

    api.post("Alimentos", newAlimento)
      .then((response) => {console.log(response)})
      .catch((error) => {console.log(error)});
  };



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
                    <Form.Label htmlFor="inputIdAlimento">Id Alimento</Form.Label>
                    <Form.Control type="text" id="inputIdAlimento" ref={idAlimento} />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputNombreAlimento">Nombre</Form.Label>
                    <Form.Control type="text" id="inputNombreAlimento" ref={nombreAlimento} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputFechaVencimiento">Fecha Vencimiento</Form.Label>
                    <Form.Control type="date" id="inputFechaVencimiento" ref={fechaVencimiento} />
                  </Col>
                  <Col>
                    <Form.Label htmlFor="inputPesoKg">Peso</Form.Label>
                    <Form.Control type="number" id="inputPesoKg" ref={pesoKg}/>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alimentos.map((alimento) => (
                <tr key={alimento.idAlimento}>
                  <td>{alimento.idAlimento}</td>
                  <td>{alimento.nombreAlimento}</td>
                  <td>{alimento.fechaVencimiento}</td>
                  <td>{alimento.pesoKg}</td>
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

export default Alimento;



