import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "../../js/sidebar.js";
import { NavDropdown } from "react-bootstrap";
import "../../style/sidebar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faUsers, faHouseFlag, faTruckArrowRight, faWarehouse, faBowlRice, faPrescriptionBottleMedical}from "@fortawesome/free-solid-svg-icons";

function Layout({ children }) {
  const queryClient = new QueryClient();

  return (
    <>
      <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        <nav id="sidebar">
          <div className="sidebar-header">
            <h1>ACNUR</h1>
          </div>

          <ul className="list-unstyled components">
            <p>Control de Giras</p>
            <li>
              <a href="/home"><FontAwesomeIcon icon={faHouse}/> Inicio</a>
            </li>
            <li>
              <a href="/usuario"><FontAwesomeIcon icon={faUsers}/> Usuario</a>
            </li>
            <li>
              <a href="/sede"><FontAwesomeIcon icon={faHouseFlag}/> Sede</a>
            </li>
            <li>
              <a href="/envio"><FontAwesomeIcon icon={faTruckArrowRight}/> EnvÍo</a>
            </li>
            <li>
              <a href="/almacen"><FontAwesomeIcon icon={faWarehouse}/> Almacén</a>
            </li>
            <li>
              <a href="/alimento"><FontAwesomeIcon icon={faBowlRice}/> Alimento</a>
            </li>
            <li>
              <a href="/medicina"><FontAwesomeIcon icon={faPrescriptionBottleMedical}/> Medicina</a>
            </li>
          </ul>
        </nav>

        {/* <!-- Page Content  --> */}
        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-info"
              >
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
              </button>
              <button
                className="btn btn-dark d-inline-block d-lg-none ml-auto"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fas fa-align-justify"></i>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ml-auto">
                  <a href="#login">
                    <NavDropdown title="Nombre Usuario" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/logout">
                        <button className="btn btn-danger">
                          Cerrar Sesión
                        </button>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </a>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container m-4 d-flex justify-content-center">
            {children}
          </div>
          <main className="flex-grow-1 p-3">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
