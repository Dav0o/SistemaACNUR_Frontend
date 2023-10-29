import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const containerStyle = {
    backgroundColor: '#7089d8',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const loginBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={containerStyle}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div style={loginBoxStyle}>
              <h2 className="mb-4">Iniciar Sesión</h2>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa tu usuario" required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Ingresar
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
