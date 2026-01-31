// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import NewInspection from "./pages/NewInspection"
import BaseLayout from "./pages/BaseLayout"
import ListadoInspecciones from "./pages/ListadoInspecciones";
import ListadoEstanterias from "./pages/ListadoEstanterias";
import NewShelf from "./pages/NewShelf";
import SettingsMenu from "./pages/SettingsMenu";
import ListadoClientes from "./pages/ListadoClientes";
import NewClient from "./pages/NewClient";


const signOut = () => {
    console.log("/");
}
const user = "";

export default function App() {
  return (
    // <Authenticator>
    //   {({ signOut, user }) => (
        <Router>
          <Routes>
            <Route element={<BaseLayout user={user} signOut={signOut} />}>
              <Route path="/" element={<ListadoInspecciones />} />
              <Route path="/new-inspection" element={<NewInspection />} /> 
              <Route path="/inspection/:id" element={<ListadoEstanterias />} /> 
              <Route path="/new-shelf" element={<NewShelf />} /> 
              <Route path="/settings" element={<SettingsMenu />} /> 
              <Route path="/clients" element={<ListadoClientes/>} /> 
              <Route path="/new-client" element={<NewClient/>} /> 
            </Route>
          </Routes>
        </Router>
    //   )}
    // </Authenticator>
  );
}
