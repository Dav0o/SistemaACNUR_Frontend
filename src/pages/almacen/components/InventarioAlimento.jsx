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
import Modal from "react-bootstrap/Modal";

function InventarioAlimento() {
  const AlmacenId = useParams();

  const LinkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const alimentoId = useRef();
  const cantidad = useRef();

  //get de Alimentos
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    api
      .get("InventarioAlimentos")
      .then((response) => {
        setAlimentos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  //get AlimentosLista
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    api
      .get("Alimentos")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const handleSave = () => {
    let newInventario = {
      alimentoId: alimentoId.current.value,
      almacenId: AlmacenId.inventarioAlimentoId,
      cantidad: cantidad.current.value,
    };
    api
      .post("InventarioAlimentos", newInventario)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [selectedAlimento, setSelectedAlimento] = useState([]);

  const handleShow = (item) => {
    setShow(true);
    setSelectedAlimento(item);
  };

  const [toEditAlimento, setToEditAlimento] = useState([]);

  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = (item) => {
    setShowEdit(true);
    setToEditAlimento(item);
  };

  const handleCloseEdit = () => setShowEdit(false);

  const alimentosFilteres = alimentos.filter(
    (a) => a.almacenId == AlmacenId.inventarioAlimentoId
  );

  return (
    <>
      <Container className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Inventario de Alimentos</h1>
        <p className="mb-4">Lista de Inventarios</p>

        <div className="card shadow mb-4">
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Click aquí para crear o editar un inventario de Alimentos
              </Accordion.Header>
              <Accordion.Body>
                <Container>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputAlimentoId">
                        Id Alimento
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>Seleccione un alimento</option>
                        {productos.map((item) => (
                          <option value={item.idAlimento} ref={alimentoId}>
                            {item.idAlimento}-{item.nombreAlimento}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label htmlFor="inputCantidad">
                        {" "}
                        Cantidad de Alimento{" "}
                      </Form.Label>
                      <Form.Control
                        type="number"
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
                  <th>Id Alimento</th>
                  <th>Id Almacén</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alimentosFilteres.map((inventarioAlimento) => (
                  <tr key={inventarioAlimento.idInventarioAlimento}>
                    <td>{inventarioAlimento.alimentoId}</td>
                    <td>{inventarioAlimento.almacenId}</td>
                    <td>{inventarioAlimento.cantidad}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleShow(inventarioAlimento)}
                      >
                        Detalles
                      </Button>{" "}
                      
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

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de inventario</Modal.Title>
        </Modal.Header>
        {selectedAlimento && (
          <>
            <Modal.Body>
              <h3>{selectedAlimento.alimentoId}</h3>
              <span>{selectedAlimento.cantidad}</span>
            </Modal.Body>
          </>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar inventario</Modal.Title>
        </Modal.Header>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InventarioAlimento;
