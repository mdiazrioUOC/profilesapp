// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import NewInspection from "./pages/NewInspection"
import BaseLayout from "./pages/BaseLayout"
import ListadoInspecciones from "./pages/ListadoInspecciones";
import ListadoEstanterias from "./pages/ListadoEstanterias";
import NewShelf from "./pages/NewShelf";
import Shelf from "./pages/Shelf";
import SettingsMenu from "./pages/SettingsMenu";
import ListadoClientes from "./pages/ListadoClientes";
import NewClient from "./pages/NewClient";
import Client from "./pages/Client";
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';
I18n.putVocabularies(translations);
I18n.setLanguage('es');
import { View, Image } from "@aws-amplify/ui-react";

const signOut = () => {
    console.log("/");
}
const user = "";

const components = {
  Header() {
    return (
      <View textAlign="center">
        <Image
          alt="Amplify logo"
          src="/src/assets/permar-logo.png"
          width={300}
        />
      </View>
    );
  }
}

export default function App() {
  return (
    <Authenticator components={components} className="flex items-center justify-center h-screen pb-20">
      {({ signOut, user }) => (
        <Router>
          <Routes>
            <Route element={<BaseLayout user={user} signOut={signOut} />}>
              <Route path="/" element={<ListadoInspecciones />} />
              <Route path="/new-inspection" element={<NewInspection />} /> 
              <Route path="/inspection/:id" element={<ListadoEstanterias />} /> 
              <Route path="/new-shelf" element={<NewShelf />} /> 
              <Route path="/estanteria/:id" element={<Shelf />} /> 
              <Route path="/settings" element={<SettingsMenu />} /> 
              <Route path="/clients" element={<ListadoClientes/>} /> 
              <Route path="/cliente/:id" element={<Client/>} /> 
              <Route path="/new-client" element={<NewClient/>} /> 
            </Route>
          </Routes>
        </Router>
      )}
    </Authenticator>
  );
}
