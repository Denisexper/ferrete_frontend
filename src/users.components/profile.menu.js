import React, { useEffect, useState } from 'react';

const ProfileMenu = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtén los datos del usuario desde localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convierte el string a objeto
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Borra los datos del usuario
    window.location.href = '/login'; // Redirige al login
  };

  if (!user) {
    return null; // Retorna null si no hay usuario logeado
  }

  return (
    <div className="relative">
      <button className="focus:outline-none">
        <img
          className="w-10 h-10 rounded-full"
          src={user.avatar} // Usa la imagen del usuario logeado
          alt="User avatar"
        />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
        <p className="block px-4 py-2 text-gray-700">
          {user.name} {/* Muestra el nombre del usuario */}
        </p>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
          Ver perfil
        </a>
        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
          Cerrar sesión
        </a>
      </div>
    </div>
  );
};

export default ProfileMenu;
