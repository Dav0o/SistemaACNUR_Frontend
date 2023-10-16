import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Envios() {

  const envios = [
    {
      id: 1,
      Destino: "Cali",
      FechaEnvio: "2021-05-01",
      tipoAyuda: "Alimentos",
      cantidad: 10,
      UnidadMedida: {
        Unidad: "Tn"
      }
    },
    {
        id: 2,
        Destino: "San José",
        FechaEnvio: "2023-04-01",
        tipoAyuda: "Medicinas",
        cantidad: 60,
        UnidadMedida: {
          Unidad: "Kg"
        }
    }

  ]


  return (
    <Container className="container-fluid">
    <h1 className="h3 mb-2 text-gray-800">Envíos</h1>
    <p className="mb-4">Lista de los envíos</p>

    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <div className="d-flex justify-content-between">
          <div>Click en el botón para crear un envío</div>
          <Button variant="primary">Crear</Button>
        </div>
      </div>
      <div className="card-body">

        


        <Table striped="columns" id="tableEnvios">
          <thead>
            <tr>
              <th>id</th>
              <th>Destino</th>
              <th>Fecha de Envio</th>
              <th>Tipo de Ayuda</th>
              <th>Cantidad </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {envios.map((envio) => (
              <tr key={envio.id}>
                <td>{envio.id}</td>
                <td>{envio.Destino}</td>
                <td>{envio.FechaEnvio}</td>
                <td>
                  {envio.tipoAyuda} 
                </td>
                <td>{envio.cantidad} {envio.UnidadMedida.Unidad}</td>
                <td>
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

export default Envios