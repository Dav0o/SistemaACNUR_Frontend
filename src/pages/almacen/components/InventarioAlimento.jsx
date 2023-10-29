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

function InventarioAlimento() {

    const LinkStyle = {
        textDecoration: "none",
        color: "white",
      };

  
    const inventarioAlimentos = [
        {
        idInventarioAlimento: 0,
        alimentoId: "CocO",
        almacenId: "PollOs",
        cantidad: 13
      }
    ];


      const idInventarioAlimento = useRef();
      const alimentoId = useRef();
      const almacenld = useRef();
      const cantidad = useRef();

      
    
      return (
        <>
          <Container className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Inventario de Alimentos</h1>
            <p className="mb-4">Lista de Inventarios</p>
    
            <div className="card shadow mb-4">
              <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Click aquí para crear un inventario de Alimentos
                  </Accordion.Header>
                  <Accordion.Body>
                    <Container>
                      <Row className="mb-2">
                        <Col>
                          <Form.Label htmlFor="inputIdInventario">Id Inventario</Form.Label>
                          <Form.Control type="number" id="inputIdInventario" ref={idInventarioAlimento} />
                        </Col>
                        <Col>
                          <Form.Label htmlFor="inputAlimentoId">Id Alimento</Form.Label>
                          <Form.Control type="text" id="inputAlimentoId" ref={alimentoId} />
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
                  <th>Id Alimento</th>
                  <th>Id Almacén</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventarioAlimentos.map((inventarioAlimento) => (
                  <tr key={inventarioAlimento.idInventarioAlimento}>
                    <td>{inventarioAlimento.idInventarioAlimento}</td>
                    <td>{inventarioAlimento.alimentoId}</td>
                    <td>{inventarioAlimento.almacenId}</td>
                    <td>{inventarioAlimento.cantidad}</td>
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

export default InventarioAlimento
