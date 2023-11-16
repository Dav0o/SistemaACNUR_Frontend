
import React, { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginComponent = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div>
      <div>
        <span>Email</span>
        <input type="text" ref={emailRef}/>
        <span>Password</span>
        <input type="password" ref={passwordRef}/>
        <button onClick={() => login(emailRef,passwordRef)}>Iniciar sesión</button>
    
    </div>
    </div>
  );
};

export default LoginComponent;
