import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Users from "./pages/usuario/Users";
import Sedes from "./pages/sede/Sedes";
import Envios from "./pages/envio/Envios";
import Almacenes from "./pages/almacen/Almacenes";
import Alimento from "./pages/alimento/Alimento";
import Medicinas from "./pages/medicina/Medicinas";

/* import "./App.css"; */

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/home" element={<Home/>}/>
          <Route path="/usuario" element={<Users/>}/>
          <Route path="/sede" element={<Sedes/>}/>
          <Route path="/envio" element={<Envios/>}/>
          <Route path="/almacen" element={<Almacenes/>}/>
          <Route path="/alimento" element={<Alimento/>}/>
          <Route path="/medicina" element={<Medicinas/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
