// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import NewInspection from "./pages/NewInspection"
import BaseLayout from "./pages/BaseLayout"
import ListadoInspecciones2 from "./pages/ListadoInspecciones2";



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
              <Route path="/" element={<ListadoInspecciones2 />} />
              <Route path="/new-inspection" element={<NewInspection />} /> 
            </Route>
          </Routes>
        </Router>
    //   )}
    // </Authenticator>
  );
}
