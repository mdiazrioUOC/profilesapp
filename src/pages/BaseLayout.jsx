// BaseLayout.jsx
import { LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function BaseLayout({ user, signOut }) {
  const [navLink, setNavLink] = useState(null);

  return (
    <div className="min-h-screen relative">
      {/* Botón de logout en la esquina superior izquierda */}
      {/* Contenido de la página */}
      <main className="p-8">
        <Outlet context={{ setNavLink }}/>
        <Navbar navLink={navLink}/>
        <h2>he</h2>
      </main>
    </div>
  );
}

