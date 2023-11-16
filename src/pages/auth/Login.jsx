import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import { useRef } from 'react';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {

  const { isAuthenticated,login } = useAuth();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      // Aquí debes llamar a la función login con las credenciales
      await login(email, password);
      
      navigate('/home');
      // Manejar el inicio de sesión exitoso, redireccionar, etc.
    } catch (error) {
      // Manejar errores, como mostrar un mensaje de error al usuario
      console.error('Error al iniciar sesión:', error.message);
    }
  };

 
  

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
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa tu correo" required ref={emailRef}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" required ref={passwordRef}/>
                </Form.Group>
                <Button variant="primary" onClick={handleLogin}>
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
