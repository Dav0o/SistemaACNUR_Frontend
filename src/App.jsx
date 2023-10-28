import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/Routes";
/* import "./App.css"; */

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        {routes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
