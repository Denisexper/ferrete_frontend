import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/getAll-product", {
      credentials: 'include'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response from backend:', data);
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error('Unexpected response format');
        }
      })
      
      .catch((error) => {
        console.error('Fetch error:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center text-gray-700 mb-10">Product List</h1>
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={product.id || index} className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Imagen del producto */}
            <img
              src={product.image} // Asegúrate de que tus productos tengan una propiedad `image`
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              {/* Nombre del producto */}
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              {/* Descripción del producto */}
              <p className="text-gray-600 mb-4">{product.description}</p>
              {/* Precio del producto */}
              <p className="text-xl font-semibold text-gray-800">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;