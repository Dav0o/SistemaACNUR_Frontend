import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import api from "../../../api/axios";

function UsuarioRol(props) {
  const { user, onSaveRoles } = props;
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {

    console.log("user", user);

    api.get("Rols").then((res) => {
      setRoles(res.data);
      console.log(res.data);
    });

    
  }, [user]);

  const handleRoleChange = (roleId) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  useEffect(() => {
    return () => {
      onSaveRoles(selectedRoles);
    }
  }, [onSaveRoles ,selectedRoles]);



  if (!user) {
    return <div>No hay usuario seleccionado</div>;
  }

  return (
    <div>
      <h2>Detalles del usuario</h2>
      <p>
        <strong>Cédula:</strong> {user.dniUsuario}
      </p>
      <p>
        <strong>Nombre:</strong> {user.nombreUsuario} {user.apellido1}{" "}
        {user.apellido2}
      </p>
      <Form>
        {roles.map((role) => (
          <Form.Check
            key={role.idRol}
            type="checkbox"
            id={`roleCheckbox-${role.idRol}`}
            label={role.nombreRol}
            checked={selectedRoles.includes(role.idRol)}
            onChange={() => handleRoleChange(role.idRol)}
          />
        ))}
      </Form>
    </div>
  );
}

export default UsuarioRol;
