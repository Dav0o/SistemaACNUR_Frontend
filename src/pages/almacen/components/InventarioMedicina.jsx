import { useRef, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import api from "../../../api/axios";
import { Link, useParams } from "react-router-dom";

function InventarioMedicina() {
  const AlmacenId = useParams();

  const LinkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const medicinaId = useRef();
  const cantidad = useRef();

  //get de los inventarios de medicina
  const [medicinas, setMedicinas] = useState([]);

  useEffect(() => {
    api
      .get("InventarioMedicinas")
      .then((response) => {
        setMedicinas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

//get de los productos en si de las medicinas

const [productos, setProductos] = useState([]);
useEffect(() => {
  api
    .get("Medicinas")
    .then((response) => {
      setProductos(response.data);
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}, []);

const handleSave = () => {
  let newInventario = {
    medicinaId: medicinaId.current.value,
    almacenId: AlmacenId.inventarioMedicinaId,
    cantidad: cantidad.current.value,
  };
  api
    .post("InventarioMedicinas", newInventario)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

  const medicinasFiltered = medicinas.filter(
    (m) => m.almacenId == AlmacenId.inventarioMedicinaId
  );
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
                      <Form.Label htmlFor="inputAlimentoId">
                        Id Medicina
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>Seleccione una medicina</option>
                        {productos.map((item)=>(
                          <option value={item.idMedicina} ref={medicinaId}>{item.idMedicina}-{item.nombreMedicina}</option>
                        ))}
                        
                        
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputCantidad">
                        {" "}
                        Cantidad de Medicina{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="inputCantidad"
                        ref={cantidad}
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
            <Table striped="columns" id="tableInvenarioAlimento">
              <thead>
                <tr>
                  <th>Id Medicina</th>
                  <th>Id Almacén</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {medicinasFiltered.map((inventarioMedicina) => (
                  <tr key={inventarioMedicina.idInventarioMedicina}>
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
          </div>
        </div>
      </Container>
    </>
  );
}

export default InventarioMedicina;
