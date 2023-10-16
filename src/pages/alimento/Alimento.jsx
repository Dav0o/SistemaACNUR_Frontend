import React from 'react'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Alimento() {

  const alimentos = [
    {
      id: 1,
      nombre: "Manzana",
      fechaVencimiento: "2021-10-10",
      peso: 0.5,
    },
    {
      id: 2,
      nombre: "Pera",
      fechaVencimiento: "2021-10-10",
      peso: 0.5,
    },
    {
      id: 3,
      nombre: "Mango",
      fechaVencimiento: "2021-10-10",
      peso: 0.5,
    },
  ]

  return (
    <Container className="container-fluid">
    <h1 className="h3 mb-2 text-gray-800">Alimentos</h1>
    <p className="mb-4">Lista de los alimentos</p>

    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <div className="d-flex justify-content-between">
          <div>Click en el botón para crear un alimento</div>
          <Button variant="primary">Crear</Button>
        </div>
      </div>
      <div className="card-body">
        <Table striped="columns" id="tableAlimento">
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Fecha de Vencimiento</th>
              <th>Peso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alimentos.map((alimento) => (
              <tr key={alimento.id}>
                <td>{alimento.id}</td>
                <td>{alimento.nombre}</td>
                <td>{alimento.fechaVencimiento}</td>
                <td>{alimento.peso}</td>
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

export default Alimento