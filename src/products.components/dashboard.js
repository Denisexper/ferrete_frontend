import React from 'react';
import ProductList from '../Product.list.js'; // Asegúrate de que la ruta sea correcta

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ProductList /> {/* Llamamos al componente que muestra los productos */}
    </div>
  );
}

export default Dashboard;

