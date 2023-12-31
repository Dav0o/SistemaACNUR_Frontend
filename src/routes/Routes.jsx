import {Route} from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from "../pages/home/Home";
import Users from "../pages/usuario/Users";
import Sedes from "../pages/sede/Sedes";
import Envios from "../pages/envio/Envios";
import Almacenes from "../pages/almacen/Almacenes";
import Alimento from "../pages/alimento/Alimento";
import Medicinas from "../pages/medicina/Medicinas";
import VoluntSanitario from "../pages/usuario/components/VoluntSanitario";
import VoluntAdministrador from "../pages/usuario/components/VoluntAdministrador";
import Socio from "../pages/usuario/components/Socio";
import InventarioAlimento from "../pages/almacen/components/InventarioAlimento";
import InventarioMedicina from "../pages/almacen/components/InventarioMedicina";
import Login from "../pages/auth/Login";
import UsuarioRol from "../pages/usuario/components/UsuarioRol";
import Reportes from "../pages/reportes/Reportes";



const routes = (
    <> 
        <Route path="/login" element={<Login/>}/>

        <Route path="/" element={<Layout />}>

          <Route index path="/home" element={<Home/>}/>
          <Route path="/usuario" element={<Users/>}/>
          <Route path="/usuario/sanitarios" element={<VoluntSanitario/>}/>
          <Route path="/usuario/administradores" element={<VoluntAdministrador/>}/>
          <Route path="/usuario/socios" element={<Socio/>}/>
          <Route path="/usuario/usuarioRol" element={<UsuarioRol/>}/>


          <Route path="/sede" element={<Sedes/>}/>
          <Route path="/envio" element={<Envios/>}/>

          <Route path="/almacen" element={<Almacenes/>}/>
          <Route path="/almacen/inventarioAlimento/:inventarioAlimentoId" element={<InventarioAlimento/>}/>
          <Route path="/almacen/inventarioMedicina/:inventarioMedicinaId" element={<InventarioMedicina/>}/>

          <Route path="/alimento" element={<Alimento/>}/>
          <Route path="/medicina" element={<Medicinas/>}/>

          <Route path="/reportes" element={<Reportes/>}/>

        </Route>
        <Route path="*" element={<Login />} />
    </>
)

export default routes;