import React from "react";
import { Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

function Layout() {
  const queryClient = new QueryClient();

  return (
    <>
    <div className="wrapper">
      <Nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
        <div className="position-sticky">
          <Nav.Item>
            <Nav.Link href="/home">Inicio</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/usuario">Usuarios</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/sede">Sede</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/envio">Envio</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/almacen">Almacen</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/alimento">Alimento</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/medicina">Medicina</Nav.Link>
          </Nav.Item>
        </div>
      </Nav>

      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
    </>
  );
}

export default Layout;
