// BaseLayout.jsx
import { LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function BaseLayout({ user, signOut }) {
  return (
    <div className="min-h-screen relative">
      {/* Botón de logout en la esquina superior izquierda */}
      <button
        onClick={signOut}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200"
      >
        <LogOut size={24} />
      </button>

      {/* Contenido de la página */}
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}

