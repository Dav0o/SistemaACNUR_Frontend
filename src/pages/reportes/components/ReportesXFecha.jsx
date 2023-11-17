import React, { useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-buttons/js/buttons.html5.mjs";
import { useEffect } from "react";
import api from "../../../api/axios";

function ReportesXFecha() {
  const [query, setQuery] = useState([]);
  const dataTableRef = useRef(null); 
  const FechaInicioRef = useRef(null);
  const FechaFinRef = useRef(null);

  const handleSearch = () => {
    let newSearch = {
      esFechaInicio: FechaInicioRef.current.value,
      esFechaFin: FechaFinRef.current.value,
    };

    api
      .post("Reportes/consultarEnvioPorFecha", newSearch)
      .then((response) => {
        console.log([response][0].data);
        setQuery([response][0].data);
      })
      .catch((error) => {
        console.log("Nuestro JSON: ", newSearch, "EL ERROR: ", error);
      });
  };


  useEffect(() => {
    if (!dataTableRef.current) {
      // Inicializa el DataTable solo en la primera renderización
      const newDataTable = new DataTable("#tableEnvio", {
        dom: "lfBrtip",
        responsive: true,
        columns: [
          { data: "idEnvio" },
          { data: "destino" },
          { data: "fechaEnvio" },
          { data: "tipoAyuda" },
          { data: "cantidad" },
          { data: "unidadMedidaId" },
        ],
        buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
      });
  
      // Guarda la referencia del DataTable en el ref
      dataTableRef.current = newDataTable;
    }
  
    // Actualiza los datos si ya existe una instancia
    if (query.length > 0) {
      dataTableRef.current.clear().rows.add(query).draw();
    }
  }, [query]);
  
  
  return (
    <>
      <Card>
        <Card.Header className="mb-3">
          <h3>Reportes por fecha Envio</h3>
        </Card.Header>

        <Card.Body>
          <Form className="mb-3">
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Fecha de Inicio</Form.Label>
                  <Form.Control type="date" ref={FechaInicioRef} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Fecha de Final</Form.Label>
                  <Form.Control type="date" ref={FechaFinRef} />
                </Form.Group>
              </Col>
            </Row>
            <Button onClick={handleSearch}>Buscar</Button>
          </Form>
         
         <Table  className="display nowrap" id="tableEnvio">
         <thead>
          <tr>
            <th>Id</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Tipo de Ayuda</th>
            <th>Cantidad</th>
            <th>Unidad de medida</th>
          </tr>
        </thead>
        <tbody>
            {query.map((item)=>(
                <tr key={item.idEnvio}>
                    <td>{item.idEnvio}</td>
                    <td>{item.destino}</td>
                    <td>{item.fechaEnvio}</td>
                    <td>{item.tipoAyuda}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.unidadMedidaId}</td>
                </tr>
            ))}
        </tbody>
         </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default ReportesXFecha;
