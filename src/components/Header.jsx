import React from 'react';
import { User } from 'lucide-react';

const Header = ({title}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white px-4 py-3 flex items-center justify-between z-50">
      <div className="flex items-center gap-3">
        <img
          src="/src/assets/permar-logo.png"
          alt="Permar Almacenaje"
          className="h-7 w-auto"
        />
      </div>
      
      <p className="font-roboto font-semibold text-xl text-center text-navy-900 absolute left-1/2 transform -translate-x-1/2">
        {title}
      </p>
      
      <button className="cursor-pointer p-2  bg-white hover:bg-gray-100">
        <User size={20} className="text-black" />
      </button>
    </header>
  );
};

export default Header;