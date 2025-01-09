import React, { useState, useEffect } from "react";
import { useCart } from "../products.components/cart.js";
import Swal from "sweetalert2";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();  // Obtener la función addToCart desde el contexto

  useEffect(() => {
    fetch("http://localhost:8080/api/getAll-product", { credentials: 'include' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);  // Usar la función del contexto para agregar al carrito

    Swal.fire({
      title: 'Producto agregado al carrito',
      text: 'El producto ha sido agregado correctamente',
      icon: 'success'
    });
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-center text-gray-700 mb-10">Product List</h1>
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-xl font-semibold text-gray-800">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
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
