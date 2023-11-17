import React, { useEffect, useState, useRef } from "react";
import api from "../../../api/axios";
import Table from "react-bootstrap/Table";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-buttons/js/buttons.html5.mjs";
import Card from 'react-bootstrap/Card';

function ReporteAlimento() {
  const [alimentos, setAlimentos] = useState([]);
  const dataTableRef = useRef(null); // Utiliza useRef para mantener la referencia del DataTable

  useEffect(() => {
    api
      .get("Reportes/inventario-alimentos")
      .then((response) => {
        setAlimentos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  useEffect(() => {
    if (!dataTableRef.current) {
      // Inicializa el DataTable solo en la primera renderización
      const newDataTable = new DataTable("#tableAlimentos", {
        dom: "lfBrtip",

        responsive: true,
        columns: [
          { data: "idAlimento" },
          { data: "nombreAlimento" },
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
          alimentos.map((item) => ({
            idAlimento: item.idAlimento,
            nombreAlimento: item.nombreAlimento,
            cantidad:
              item.inventarioAlimentos.length > 0
                ? item.inventarioAlimentos[0].cantidad
                : 0,
            almacenId:
              item.inventarioAlimentos.length > 0
                ? item.inventarioAlimentos[0].almacenId
                : "",
          }))
        )
        .draw();
    }
  }, [alimentos]);

  return (
    <Card className="shadow p-3 d-flex">
        <Card.Header className="mb-3"><h3>Inventario de Alimentos</h3></Card.Header> 
        <Card.Body>
      <Table  className="display nowrap" id="tableAlimentos">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Almacen</th>
          </tr>
        </thead>
        <tbody>
          {alimentos.map((item) => (
            <tr key={item.idAlimento}>
              <td>{item.idAlimento}</td>
              <td>{item.nombreAlimento}</td>
              <td>
                {item.inventarioAlimentos.length > 0
                  ? item.inventarioAlimentos[0].cantidad
                  : 0}
              </td>
              <td>
                {item.inventarioAlimentos.length > 0
                  ? item.inventarioAlimentos[0].almacenId
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Card.Body>
    </Card>
  );
}

export default ReporteAlimento;
