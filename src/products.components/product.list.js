// ProductList.js
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Cargar los productos desde la API
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

  // Función para agregar un producto al carrito
    const addToCart = (product) => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const newCart = [...storedCart];
      
      const productIndex = newCart.findIndex(item => item.id === product.id);
      if (productIndex !== -1) {
        newCart[productIndex].quantity += 1;

        Swal.fire({
          title: 'Producto agregado al carrito',
          text: 'El producto ha sido agregado correctamente',
          icon: 'success'
        })
      } else {
        newCart.push({ ...product, quantity: 1 }); // si no esta lo agrega con cantidad 1
        Swal.fire({
          title: 'producto agregado al carrito',
          text: 'El producto ha sido agregado correctamente',
          icon: 'success'
        })
         
      }

      localStorage.setItem('cart', JSON.stringify(newCart)); // Guardar el carrito en localStorage
      console.log('Producto agregado al carrito:', product);
    };

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
              {/* Botón para agregar al carrito */}
              <button
                onClick={() => addToCart(product)} // Agrega el producto específico al carrito
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
