import React, { useEffect, useState, useRef } from "react";
import api from "../../../api/axios";
import Table from "react-bootstrap/Table";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-buttons/js/buttons.html5.mjs";
import Card from 'react-bootstrap/Card';

function ReportesMedicina() {

    const [medicinas, setMedicinas] = useState([]);
  const dataTableRef = useRef(null); // Utiliza useRef para mantener la referencia del DataTable

  useEffect(() => {
    api
      .get("Reportes/inventario-medicinas")
      .then((response) => {
        setMedicinas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  useEffect(() => {
    if (!dataTableRef.current) {
      // Inicializa el DataTable solo en la primera renderización
      const newDataTable = new DataTable("#tableMedicinas", {
        dom: "lfBrtip",

        responsive: true,
        columns: [
          { data: "idMedicina" },
          { data: "nombreMedicina" },
          { data: "cantidad" },
          { data: "almacenId" },
        ],
        buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
      });

      // Guarda la referencia del DataTable en el ref
      dataTableRef.current = newDataTable;
    } else {
      // Actualiza los datos si ya existe una instancia
      dataTableRef.current
        .clear()
        .rows.add(
          medicinas.map((item) => ({
            idMedicina: item.idMedicina,
            nombreMedicina: item.nombreMedicina,
            cantidad:
              item.inventarioMedicinas.length > 0
                ? item.inventarioMedicinas[0].cantidad
                : 0,
            almacenId:
              item.inventarioMedicinas.length > 0
                ? item.inventarioMedicinas[0].almacenId
                : "",
          }))
        )
        .draw();
    }
  }, [medicinas]);
  return (
    <Card className="shadow p-3 d-flex">
        <Card.Header className="mb-3"><h3>Inventario de Medicinas</h3></Card.Header> 
        <Card.Body>
      <Table  className="display nowrap" id="tableMedicinas">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Almacen</th>
          </tr>
        </thead>
        <tbody>
          {medicinas.map((item) => (
            <tr key={item.idMedicina}>
              <td>{item.idMedicina}</td>
              <td>{item.nombreMedicina}</td>
              <td>
                {item.inventarioMedicinas.length > 0
                  ? item.inventarioMedicinas[0].cantidad
                  : 0}
              </td>
              <td>
                {item.inventarioMedicinas.length > 0
                  ? item.inventarioMedicinas[0].almacenId
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Card.Body>
    </Card>
  )
}

export default ReportesMedicina