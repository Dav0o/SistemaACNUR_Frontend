import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Users() {
  const users = [
    {
      id: 1,
      dni: 504400048,
      name: "Eylin",
      lastName1: "Cabrera",
      lastName2: "Lukes",
      email: "cabrera@gmail.com",
    },
  ];
  return (
    <Container className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Usuarios</h1>
      <p className="mb-4">Lista de usuarios</p>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="d-flex justify-content-between">
            <div>Click en el botón para crear un usuario</div>
            <Button variant="primary">Crear</Button>
          </div>
        </div>
        <div className="card-body">
          <Table striped="columns" id="tableUsers">
            <thead>
              <tr>
                <th>Id</th>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo Electronico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.dni}</td>
                  <td>{user.name}</td>
                  <td>
                    {user.lastName1} {user.lastName2}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="warning">Rol</Button>{" "}
                    <Button variant="success">Actualizar</Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary">VolSani</Button>{" "}
          <Button variant="primary">VolAdmin</Button>{" "}
          <Button variant="primary">Socio</Button>
        </div>
      </div>
    </Container>
  );
}

export default Users;
