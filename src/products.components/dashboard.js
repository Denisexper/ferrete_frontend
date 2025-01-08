import React, { useState } from 'react';
import ProductList from '../products.components/product.list.js';

function Dashboard({ setCart }) {
  const [cartItems, setCartItems] = useState([]); // Cambié el nombre de la variable

  return (
    <div>
      {/* Pasamos setCart como prop a ProductList */}
      <ProductList setCart={setCart} />
    </div>
  );
}

export default Dashboard;
