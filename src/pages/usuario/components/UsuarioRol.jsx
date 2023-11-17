import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import api from "../../../api/axios";

function UsuarioRol(props) {
  const { user, joinedUser } = props;
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    api.get("Rols").then((res) => {
      setRoles(res.data);
    });
  }, []);

  const handleRoleChange = (roleId) => {
    if (selectedRoles.includes(roleId)) {
      const updatedRoles = selectedRoles.filter((id) => id !== roleId);
      setSelectedRoles(updatedRoles);
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  useEffect(() => {
    if (joinedUser && joinedUser.length > 0) {
      const usuarioDni = user.dniUsuario;

      const rolesToDelete = joinedUser
        .filter((userRole) => !selectedRoles.includes(userRole.rol.idRol))
        .map((userRole) => userRole.rol.idRol);

      const rolesToAdd = selectedRoles.filter(
        (roleId) => !joinedUser.some((userRole) => userRole.rol.idRol === roleId)
      );

      rolesToDelete.forEach((rolId) => {
        console.log("Enio", {usuarioDni, rolId});
        api.delete(`UsuarioRols?usuarioDni=${usuarioDni}&rolId=${rolId}`).then((res) => {
          console.log("Role deleted:", res.data);
        }).catch((error) => {
          console.error("Error deleting role:", error);
          
        });
      });

      rolesToAdd.forEach((rolId) => {
        api.post("UsuarioRols", { usuarioDni, rolId }).then((res) => {
          console.log("Role added:", res.data);
        }).catch((error) => {
          console.error("Error adding role:", error);
        });
      });
    }
  }, [joinedUser, selectedRoles, user]);

  useEffect(() => {
    setSelectedRoles([]);
  }, [user]);
  

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
        <strong>Nombre:</strong> {user.nombreUsuario}{" "}
        {user.apellido1} {user.apellido2}
      </p>
      <Form>
        {roles.map((role) => (
          <Form.Check
            key={role.idRol}
            type="checkbox"
            id={`roleCheckbox-${role.idRol}`}
            label={role.nombreRol}
            checked={
              selectedRoles.includes(role.idRol) ||
              joinedUser.some((userRole) => userRole.rol.idRol === role.idRol)
            }
            onChange={() => handleRoleChange(role.idRol)}
          />
        ))}
      </Form>
    </div>
  );
}

export default UsuarioRol;
