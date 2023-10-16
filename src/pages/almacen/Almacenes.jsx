import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Almacenes() {

  const almacenes = [
  {
    id: "12dSDF-3FRS3",
    nombre: "POCOSOL",
    descripcion: "Almacen de alimentos frios",
    sede: {
      id: "Sede 1",
      nombre: "Sede Rolo"
    }
  },{
    id: "BO123",
    nombre: "Flor de loto",
    descripcion: "Almacen de medicinas",
    sede:{
        id: "Sede 2",
        nombre: "Sede Paquita"
    }
    

  }
  ]

  return (
    <Container className="container-fluid">
    <h1 className="h3 mb-2 text-gray-800">Almacenes</h1>
    <p className="mb-4">Lista de los almacenes</p>

    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <div className="d-flex justify-content-between">
          <div>Click en el botón para crear un almacén</div>
          <Button variant="primary">Crear</Button>
        </div>
      </div>
      <div className="card-body">
        <Table striped="columns" id="tableAlmacen">
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Sede</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {almacenes.map((almacen) => (
              <tr key={almacen.id}>
                <td>{almacen.id}</td>
                <td>{almacen.nombre}</td>
                <td>{almacen.descripcion}</td>
                <td>{almacen.sede.nombre}</td>
                <td>
                  <Button variant="primary">Alimentos</Button>{" "}
                  <Button variant="primary">Medicinas</Button>
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

export default Almacenes