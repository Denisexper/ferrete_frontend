import React from 'react';
import ProductList from '../Product.list.js'; // Asegúrate de que la ruta sea correcta
import ProfileMenu from '../users.components/profile.menu.js';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ProductList /> {/* Llamamos al componente que muestra los productos */}
      <ProfileMenu />
    </div>
  );
}

export default Dashboard;

