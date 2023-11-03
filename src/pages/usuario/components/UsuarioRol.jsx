import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import api from "../../../api/axios";

function UsuarioRol(props) {
  const { user } = props;
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    // Obtener la lista de roles desde la API cuando el componente se monta
    api.get("Rols").then((res) => {
      setRoles(res.data);
    });
  }, []);

  // Función para manejar cambios en los checkboxes de roles
  const handleRoleChange = (roleId) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  if (!user) {
    return <div>No hay usuario seleccionado</div>;
  }

  return (
    <div>
      <h2>Detalles del Usuario</h2>
      <p><strong>Cédula:</strong> {user.dniUsuario}</p>
      <p><strong>Nombre:</strong> {user.nombreUsuario} {user.apellido1} {user.apellido2}</p>

      {/* Grupo de checkboxes para elegir roles para el usuario */}
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

      {/* Agregar más propiedades según sea necesario */}
    </div>
  );
}

export default UsuarioRol;
