import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../../../api/axios";

const voluntSanitarios = [
    {
        id: 1,
        name: "Juan",
        lastName1: "Perez",
        lastName2: "Gonzalez",
        email: "",
        disponible: true,
        phone: "12345678",
        sede: "San Jose"
    },
    {
        id: 2,
        name: "Maria",
        lastName1: "Gonzalez",
        lastName2: "Perez",
        email: "",
        disponible: true,
        phone: "12345678",
        sede: "San Jose"
    },
]


function VoluntSanitario() {

    const LinkStyle = {
        textDecoration: "none",
        color: "white",
      };


  return (
     <>
      <Container className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">
          Voluntarios Sanitarios
        </h1>
        <p class="mb-4">Lista de los voluntarios sanitarios</p>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <div className="d-flex justify-content-between">
              <div>Clik en el botón para crear un volunario sanitario</div>
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
                  <th>Sede</th>
                  <th>Telefono</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {voluntSanitarios.map((voluntSanitario) => (
                  <tr key={voluntSanitario.id}>
                    <td>{voluntSanitario.id}</td>
                    <td>{voluntSanitario.name}</td>
                    <td>{voluntSanitario.lastName1} {voluntSanitario.lastName2}</td>
                    <td>{voluntSanitario.sede}</td>
                    <td>{voluntSanitario.phone}</td>
                  
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
    </>
   

  );
}

export default VoluntSanitario