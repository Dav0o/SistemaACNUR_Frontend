import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Sedes() {
  const sedes = [
    {
      id: "Sede 1",
      nombre: "Sede Rolo",
      direccion: {
        pais: "Colombia",
        ciudad: "Bogotá",
        estado: "Cundinamarca",
      },
    },
    {
      id: "Sede 2",
      nombre: "Sede Paisa",
      direccion: {
        pais: "Colombia",
        ciudad: "Medellín",
        estado: "Antioquia",
      },
    },
    {
      id: "Sede 3",
      nombre: "Sede Chepe",
      direccion: {
        pais: "Costa Rica",
        ciudad: "San José",
        estado: "San José",
      }
    }
  ];

  return (
    <Container className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Sedes</h1>
      <p className="mb-4">Lista de las sedes</p>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="d-flex justify-content-between">
            <div>Click en el botón para crear una sede</div>
            <Button variant="primary">Crear</Button>
          </div>
        </div>
        <div className="card-body">
          <Table striped="columns" id="tableSedes">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sedes.map((sede) => (
                <tr key={sede.id}>
                  <td>{sede.id}</td>
                  <td>{sede.nombre}</td>
                  <td>{sede.direccion.pais}</td>
                  <td>{sede.direccion.ciudad}</td>
                  <td>{sede.direccion.estado}</td>
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

export default Sedes;
