import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";


function ProductList({ setCart }) {
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
 

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = [...storedCart];
  
    const productIndex = newCart.findIndex(item => item.id === product.id);
  
    // Si el producto ya está en el carrito, incrementa la cantidad
    if (productIndex !== -1) {
      newCart[productIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      newCart.push({ ...product, quantity: 1 });
    }
  
    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(newCart));
  
    // Solo actualizamos el estado de React si la función setCart está disponible
    if (typeof setCart === 'function') {
      setCart(newCart); // Actualiza el estado en React
    } else {
      console.error('setCart no está definido o no es una función');
    }
  
    // Muestra el SweetAlert con el mensaje de éxito
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
        {products.map((product, index) => (
          <div key={product.id || index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-xl font-semibold text-gray-800">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
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
