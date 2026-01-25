// BaseLayout.jsx
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Header from '@/components/Header';

export default function BaseLayout({ user, signOut }) {
  const [navLink, setNavLink] = useState(null);
  const [headerTitle, setHeader] = useState(null);
  const [goBack, setGoBack] = useState(null);

  return (
    <div className="min-h-screen relative">
      {/* Botón de logout en la esquina superior izquierda */}
      {/* Contenido de la página */}
      <main className= "p-8">
        <div className="min-h-screen bg-white">
          <div className= {goBack? "pt-16": "pt-6"}>
            <Header title={headerTitle} goBack={goBack} />
            <Outlet context={{ setNavLink, setHeader, setGoBack}}/>
          </div>
        </div>
        <Navbar navLink={navLink}/>
      </main>
    </div>
  );
}

