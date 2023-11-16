import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";
/* import "./App.css"; */

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
