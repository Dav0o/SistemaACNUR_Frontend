import React from 'react'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Medicinas() {
  
  const medicinas = [
    {
      id: 1,
      nombre: "Acetaminofen",
      fechaVencimiento: "2021-10-10",
    },
    {
      id: 2,
      nombre: "Acetaminofen",
      fechaVencimiento: "2021-10-10",
    },
    {
      id: 3,
      nombre: "Acetaminofen",
      fechaVencimiento: "2021-10-10",
    },
  ]
  
  return (
    <Container className="container-fluid">
    <h1 className="h3 mb-2 text-gray-800">Medicinas</h1>
    <p className="mb-4">Lista de las medicinas</p>

    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <div className="d-flex justify-content-between">
          <div>Click en el botón para crear una medicina</div>
          <Button variant="primary">Crear</Button>
        </div>
      </div>
      <div className="card-body">
        <Table striped="columns" id="tableMedicinas">
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
              <tr key={medicina.id}>
                <td>{medicina.id}</td>
                <td>{medicina.nombre}</td>
                <td>{medicina.fechaVencimiento}</td>
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

  
  )
}

export default Medicinas