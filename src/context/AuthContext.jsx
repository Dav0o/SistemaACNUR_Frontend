import React, { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
 

  const login = (email,password) => {
    let loginuser ={
        correo: email,
        clave: password
    };
    api
      .post("Usuario/login", loginuser)
      .then((response) => {
        console.log(response);
        setAuthenticated(true);
        
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  const logout = () => {
    // Lógica de cierre de sesión
    setAuthenticated(false);
  };

  const contextValue = useMemo(() => ({
    isAuthenticated,
    login,
    logout,
  }), [isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};