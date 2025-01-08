import React from 'react';
import ProductList from '../products.components/product.list.js';

function Dashboard({ setCart }) {
  return (
    <div>
      {/* Pasamos setCart como prop a ProductList */}
      <ProductList setCart={setCart} />
    </div>
  );
}

export default Dashboard;
