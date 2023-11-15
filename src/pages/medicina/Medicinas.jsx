import React, { useRef, useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import api from "../../api/axios";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Offcanvas from "react-bootstrap/Offcanvas";

function Medicinas() {
  

  const idMedicina = useRef();
  const nombreMedicina = useRef();
  const fechaVencimiento = useRef();


  const [medicinas, setMedicinas] = useState([]);
  const [editingMedicina , setEditingMedicina] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMedicina, setSelectedMedicina] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);


  useEffect(() => {
    api
      .get("Medicinas")
      .then((response) => {
        setMedicinas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const handleSave = () => {
    let newMedicina = {
      idMedicina: idMedicina.current.value,
      nombreMedicina: nombreMedicina.current.value,
      fechaVencimiento: fechaVencimiento.current.value
    };

    console.log(newMedicina);

    api.post("Medicinas", newMedicina)
    .then((response) => {
      console.log(response);
      Swal.fire({
        title: 'Éxito',
        text: '¡Medicina guardada exitosamente!',
        icon: 'success',
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar la medicina.',
        icon: 'error',
      });
    });
};


  //////////////////////----------update------------///////////////////////////7

  const handleEditClick = (medicina) => {
    setEditingMedicina(medicina);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingMedicina(null);
  };


  const handleUpdate = () => {

    const updatedMedicina = {
      idMedicina: editingMedicina.idMedicina,
      nombreMedicina: nombreMedicina.current.value,
      fechaVencimiento: fechaVencimiento.current.value
      
    };

    api
      .put("Medicinas", updatedMedicina)
      .then((response) => {
        Swal.fire({
          title: "¡Actualizado!",
          text: "La medicina ha sido actualizada correctamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          console.log(response);
          setShowEditModal(false);
          setEditingMedicina(null);
        });
      })
      .catch((error) => {
        console.error("Error al actualizar la medicina:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar la medicina.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };
  ///////////////////---------------------------------//////////////////////////////


  
  //////////////////////----------delete------------///////////////////////////7

  const handleDelete = (medicinaId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {

        api
          .delete(`Medicinas?Id=${medicinaId}`)
          .then((response) => {
            console.log(response);
          
            const updatedMedicinas = medicinas.filter(
              (medicina) => medicina.idMedicina !== medicinaId
            );
            setMedicinas(updatedMedicinas);
          })
          .catch((error) => {
            console.error("Error al eliminar la medicina:", error);
          });
      }
    });
  };
  ///////////////////---------------------------------//////////////////////////////




  ///////////////////---------------Details-------------//////////////////////////////

  const handleDetailsClick = (medicina) => {
    setSelectedMedicina(medicina);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  ///////////////////---------------------------------//////////////////////////////



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
                  <Button variant="danger" onClick={() => handleDelete(medicina.idMedicina)}>
                      Eliminar</Button>{" "}

                      <Button variant="success" onClick={() => handleEditClick(medicina)}>
                      Actualizar
                    </Button>{" "}

                    <Button variant="info"onClick={() => handleDetailsClick(medicina)}>
                    Detalles</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Medicina</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editingMedicina ? editingMedicina.nombreMedicina : ""}
                ref={nombreMedicina}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha Vencimiento</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editingMedicina ? editingMedicina.fechaVencimiento : ""}
                ref={fechaVencimiento}
              />
            </Form.Group>
          
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>


      <Offcanvas
        show={isDetailsOpen}
        onHide={handleCloseDetails}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Detalles de la Medicina</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedMedicina && (
            <div>
              <div>
               
               <div style={{ marginBottom: '20px' }} >
                <strong>ID:</strong> {selectedMedicina.idMedicina}
               </div>
                <div  style={{ marginBottom: '15px' }}>
                  <strong>Nombre:</strong> {selectedMedicina.nombreMedicina}
                  </div>
                  <div  style={{ marginBottom: '15px' }}>
                  <strong>Fecha de Vencimiento:</strong> {selectedMedicina.fechaVencimiento}
                </div>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>





    </Container>
  );
}

export default Medicinas
