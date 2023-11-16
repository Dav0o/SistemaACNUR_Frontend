import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { Button, Table, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../../../api/axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Modal } from "react-bootstrap";

function Socio() {

  const idSocio = useRef(null);
  const cuentaBanco = useRef(null);
  const usuarioDni = useRef(null);
  const cuotaId = useRef(null);

  const [socios, setSocios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cuotas, setCuotas] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    api.get("Usuario")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Error :', error);
      });


    api.get("Cuotas")
      .then((response) => {
        setCuotas(response.data);
      })
      .catch((error) => {
        console.error('Error :', error);
      });
  }, []);


  useEffect(() => {
    api
      .get("Socios")
      .then((response) => {
        setSocios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [refresh]);

  const handleSave = () => {

    let newSocio = {
      idSocio: idSocio.current.value,
      cuentaBanco: cuentaBanco.current.value,
      usuarioDni: usuarioDni.current.value,
      cuotaId: cuotaId.current.value
    };
    console.log("datos:", newSocio);
    api
      .post("Socios", newSocio)
      .then((response) => {
        console.log(response);
        setRefresh(!refresh);
        Swal.fire({
          title: 'Éxito',
          text: '¡Socio registrado exitosamente!',
          icon: 'success',
        });
        
        idSocio.current.value = '';
        cuentaBanco.current.value = '';
        usuarioDni.current.value = '';
        cuotaId.current.value = '';
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al registrar al socio.',
          icon: 'error',
        });
      });
  };

  const LinkStyle = {
    textDecoration: "none",
    color: "white",
  };


  //////////////////////----------update------------///////////////////////////7
  const [editingSocio, setEditingSocio] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (socio) => {
    setEditingSocio(socio);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingSocio(null);
  };


  const handleUpdate = () => {

    const updatedSocio = {
      idSocio: idSocio.current.value,
      cuentaBanco: cuentaBanco.current.value,
      usuarioDni: usuarioDni.current.value,
      cuotaId: cuotaId.current.value
    };

    api
      .put("Socios", updatedSocio)
      .then((response) => {
        Swal.fire({
          title: "¡Actualizado!",
          text: "El socio ha sido actualizado correctamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          console.log(response);
          setShowEditModal(false);
          setEditingSocio(null);
        });
      })
      .catch((error) => {
        console.error("Error al actualizar el socio:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar el socio.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };
  ///////////////////---------------------------------//////////////////////////////



  //////////////////////----------delete------------///////////////////////////7

  const handleDelete = (cuotaId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {

        api
          .delete(`Socios?Id=${cuotaId}`)
          .then((response) => {
            console.log(response);

            const updatedSocios = socios.filter(
              (socio) => socio.idSocio !== idSocio
            );
            setSocios(updatedSocios);
          })
          .catch((error) => {
            console.error("Error al eliminar el socio:", error);
          });
      }
    });
  };
  ///////////////////---------------------------------//////////////////////////////



  return (

    <Container className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800"> Socios  </h1>
      <p class="mb-4">Lista de los socios</p>

      <div className="card shadow mb-4">
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Click en el botón para crear un nuevo socio
            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row className="mb-2">
                  <Col>
                    <Form.Label htmlFor="inputIdSocio">Id Socio</Form.Label>
                    <Form.Control type="text" id="inputIdSocio" ref={idSocio} />
                  </Col>

                  <Col>
                    <Form.Label htmlFor="inputUsuarioDni">Usuario</Form.Label>
                    <Form.Control as="select" id="inputUsuarioDni" ref={usuarioDni}>
                      <option value="">Seleccione un usuario</option>
                      {usuarios.map((usuario) => (
                        <option key={usuario.DNI} value={usuario.dniUsuario}>
                          {usuario.dniUsuario} - {usuario.nombreUsuario} {usuario.apellido1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col>
                    <Form.Label htmlFor="inputCuentaBanco">Cuenta Banco</Form.Label>
                    <Form.Control type="text" id="inputCuentaBanco" ref={cuentaBanco} />
                  </Col>

                  <Col>
                    <Form.Label htmlFor="inputCuotaId">Cuota</Form.Label>
                    <Form.Control as="select" id="inputCuotaId" ref={cuotaId}>
                      <option value="">Seleccione una cuota</option>

                      {cuotas.map((cuota) => (
                        <option key={cuota.idCuota} value={cuota.idCuota}>
                          <option value="{cuota.idCuota}"> {cuota.tipoCuota} -${cuota.cargosAnuales}</option>

                        </option>
                      ))}
                    </Form.Control>
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
          <Table striped="columns">
            <thead>
              <tr>
                <th>ID</th>
                <th>DniUsuario</th>
                <th>Cuenta Bancaria</th>
                <th>Cuota</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {socios.map((socio) => (
                <tr key={socio.id}>
                  <td>{socio.idSocio}</td>
                  <td>{socio.usuarioDni}</td>
                  <td>{socio.cuentaBanco}</td>
                  <td>{socio.cuotaId}</td>

                  <td>

                    <Button
                      variant="warning"
                      className="bg-gradient-warning mr-1 text-light"
                      onClick={() => handleEditClick(socio)}
                    >
                      <i class="bi bi-pencil-square"></i>
                    </Button>{" "}
                    <Button
                      variant="danger"
                      className="bg-gradient-danger mr-1 text-light"
                      onClick={() => handleDelete(socio.idSocio)}
                    >
                      <i class="bi bi-trash"></i>

                    </Button>{" "}


                  </td>
                </tr>
              ))}
            </tbody>

          </Table>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Alimento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Id Socio</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editingSocio ? editingSocio.idSocio : ''}
                ref={idSocio}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cuenta de Banco</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editingSocio ? editingSocio.cuentaBanco : ''}
                ref={cuentaBanco}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dni Usuario</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editingSocio ? editingSocio.usuarioDni : ''}
                ref={usuarioDni}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Id Cuota</Form.Label>
              <Form.Control as="select" ref={cuotaId}>
            
                {cuotas.map((cuota) => (
                  <option key={cuota.idCuota} value={cuota.idCuota} selected={editingSocio?.cuotaId === cuota.idCuota}>
                    {cuota.idCuota}
                  </option>
                ))}
              </Form.Control>
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


      <Link style={LinkStyle} to={"/usuario"}>
        <Button variant="dark" className="bg-gradient-danger">
          Regresar
        </Button>
      </Link>
    </Container>

  )
}

export default Socio