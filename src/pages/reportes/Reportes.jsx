import React from "react";
import ReporteAlimento from "./components/ReportesAlimentos";
import ReportesMedicina from "./components/ReportesMedicina";
import ReportesXFecha from "../reportes/components/ReportesXFecha";
function Reportes() {
  return (
    <>
      <h2>Reportes</h2>
      <p>Reportes Generales del Sistema</p>
      <ReporteAlimento/>
    <br />
      <ReportesMedicina/>
      <br />
      <ReportesXFecha/>
    </>
  );
}

export default Reportes;
