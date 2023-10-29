import { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import api from "../../../api/axios";
import { Link } from "react-router-dom";

function InventarioMedicina() {

    const LinkStyle = {
        textDecoration: "none",
        color: "white",
      };

  
    const inventarioMedicinas = [
        {
        idInventarioMedicina: 0,
        medicinaId: "PaleTaAmol",
        almacenId: "HellAdo",
        cantidad: 10000
      }
    ];


      const idInventarioMedicina = useRef();
      const medicinaId = useRef();
      const almacenld = useRef();
      const cantidad = useRef();

    return (
        <>
        <Container className="container-fluid">
          <h1 className="h3 mb-2 text-gray-800">Inventario de Medicinas</h1>
          <p className="mb-4">Lista de Inventarios</p>
  
          <div className="card shadow mb-4">
            <Accordion defaultActiveKey="1">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Click aquí para crear un inventario de Medicina
                </Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <Row className="mb-2">
                      <Col>
                        <Form.Label htmlFor="inputIdInventario">Id Inventario</Form.Label>
                        <Form.Control type="number" id="inputIdInventario" ref={idInventarioMedicina} />
                      </Col>
                      <Col>
                        <Form.Label htmlFor="inputAlimentoId">Id Medicina</Form.Label>
                        <Form.Control type="text" id="inputAlimentoId" ref={medicinaId} />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <Form.Label htmlFor="inputAlmacenId">Id Almacén</Form.Label>
                        <Form.Control type="text" id="inputAlmacenId" ref={almacenld} />
                      </Col>
                      <Col>
                        <Form.Label htmlFor="inputCantidad"> Cantidad de Alimento </Form.Label>
                        <Form.Control type="text" id="inputCantidad" ref={cantidad} />
                      </Col>
                    </Row>
  
                    <Button
                      variant="primary"
                      onClick={/* handleSave */ 1+1}
                      className="mt-3"
                    >
                      Guardar
                    </Button>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
      <Table striped="columns" id="tableInvenarioAlimento">
            <thead>
              <tr>
                <th>Id inventario</th>
                <th>Id Medicina</th>
                <th>Id Almacén</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inventarioMedicinas.map((inventarioMedicina) => (
                <tr key={inventarioMedicina.idInventarioMedicina}>
                  <td>{inventarioMedicina.idInventarioMedicina}</td>
                  <td>{inventarioMedicina.medicinaId}</td>
                  <td>{inventarioMedicina.almacenId}</td>
                  <td>{inventarioMedicina.cantidad}</td>
                  <td>
                    <Button variant="info">Detalles</Button>{" "}
                    <Button variant="success">Actualizar</Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
                
      <Link style={LinkStyle} to={"/almacen"}>
      <Button variant="dark" className="bg-gradient-danger">
        Regresar
      </Button>
    </Link>
        </Container>
      </>
  );
}

export default InventarioMedicina;
