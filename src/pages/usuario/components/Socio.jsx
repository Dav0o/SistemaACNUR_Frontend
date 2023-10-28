import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


const socios = [
    {
        id: 1,
        name: "Martha",
        lastName1: "Perez",
        lastName2: "Gonzalez",
        cuentaBancaria: "2613817391",
        phone: "12345678"
      
    },
    {
        id: 2,
        name: "Rogelio",
        lastName1: "Gomez",
        lastName2: "Pereira",
        cuentaBancaria: "663628261",
        phone: "12345678",
     
    },
]

function Socio() {

    const LinkStyle = {
        textDecoration: "none",
        color: "white",
      };


  return (
    <>
    <Container className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">
        Socios
      </h1>
      <p class="mb-4">Lista de los socios</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="d-flex justify-content-between">
            <div>Clik en el botón para crear un nuevo socio</div>
            <Button
              variant="success"
              className="bg-gradient-success text-light
              "
              onClick={/* handleShowFormModal */ 1+1}
            >
              <i class="bi bi-plus-square"></i>
            </Button>
          </div>
        </div>
        <div className="card-body">
          <Table striped="columns">
            <thead>
              <tr>
                  <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Cuenta Bancaria</th>
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {socios.map((socio) => (
                <tr key={socio.id}>
                  <td>{socio.id}</td>
                  <td>{socio.name}</td>
                  <td>{socio.lastName1} {socio.lastName2}</td>
                  <td>{socio.cuentaBancaria}</td>
                  <td>{socio.phone}</td>
                
                  <td>
                    <Button
                      variant="warning"
                      className="bg-gradient-warning mr-1 text-light"
                      onClick={/* () => handleEditClick(voluntSanitario.id) */ 1+1}
                    >
                      <i class="bi bi-pencil-square"></i>
                    </Button>{" "}
                    <Button
                      variant="danger"
                      className="bg-gradient-danger mr-1 text-light"
                      onClick={/* () => handleOpenModal(voluntSanitario.id) */  1+1}
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

      <Link style={LinkStyle} to={"/usuario"}>
        <Button variant="dark" className="bg-gradient-danger">
          Regresar
        </Button>
      </Link>
    </Container>

    {/* <Modal show={modalCreate} onHide={handleCloseFormModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear voluntario sanitario </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formPlaca">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el daño"
                  ref={name}
                />
              </Form.Group>

              <Form.Group controlId="formPlaca">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Fecha de cuando sucedió"
                  ref={date}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="formColor">
                <Form.Label>Gravedad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la gravedad"
                  ref={severity}
                />
              </Form.Group>

              <Form.Group controlId="formColor">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el tipo"
                  ref={type}
                />
              </Form.Group>
            </div>
          </div>
          <Form.Group controlId="formColor">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción del suceso"
              ref={description}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
               
                onChange={handleImageUpload}
              />
              <label className="custom-file-label" htmlFor="customFile">
              </label>
            </div>
            {imageUrl && <img src={imageUrl} alt="Imagen subida" className="uploadedImg"
            style={{ maxWidth: '200px', maxHeight: '200px' }} />}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseFormModal}>
          Cancelar
        </Button>
        <Button variant="dark" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar mantenimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre"
                  defaultValue={
                    editingMaintenance ? editingMaintenance.name : ""
                  }
                  ref={name}
                />
              </Form.Group>

              <Form.Group controlId="formCategory">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese la categoría"
                  defaultValue={
                    editingMaintenance ? editingMaintenance.category : 0
                  }
                  ref={category}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="formSeverity">
                <Form.Label>Gravedad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la gravedad"
                  defaultValue={
                    editingMaintenance ? editingMaintenance.severity : ""
                  }
                  ref={severity}
                />
              </Form.Group>

              <Form.Group controlId="formType">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el tipo"
                  defaultValue={
                    editingMaintenance ? editingMaintenance.type : ""
                  }
                  ref={type}
                />
              </Form.Group>
            </div>
          </div>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción"
              defaultValue={
                editingMaintenance ? editingMaintenance.description : ""
              }
              ref={description}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleCloseEditModal}>
          Cancelar
        </Button>
        <Button variant="dark" onClick={handleUpdate}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que quieres eliminar este mantenimiento?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteMaintenance}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal> */}
  </>
  )
}

export default Socio