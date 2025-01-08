import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Header = () => {
  const [cart, setCart] = useState([]);  // Estado del carrito
  const [total, setTotal] = useState(0); // Estado para el total
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para el carrito abierto

  // Cargar el carrito desde localStorage
  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart);
    };
    window.addEventListener('storage', updateCart); // Actualizar cuando el almacenamiento cambie

    // Llamada inicial para cargar el carrito
    updateCart();

    // Limpieza del listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('storage', updateCart);
    };
  }, []);

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    
    localStorage.setItem('cart', JSON.stringify(newCart)); // Guardar en localStorage
    Swal.fire({
      title: 'Producto eliminado',
      text: 'El producto ha sido eliminado del carrito',
      icon: 'success',
    });
  };

  // Calcular el total del carrito cada vez que cambian los productos
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  // Función para finalizar la compra
  const checkout = () => {
    Swal.fire({
      title: '¡Gracias por tu compra!',
      text: 'Tu total es: $' + total,
      icon: 'success',
    });
    setCart([]); // Vaciar el carrito
    localStorage.removeItem('cart'); // Eliminar el carrito de localStorage
    setIsCartOpen(false); // Cerrar el carrito después del checkout
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Tienda</h1>
        
        {/* Botón del carrito */}
        <div className="relative">
          <button onClick={() => setIsCartOpen(!isCartOpen)} className="flex items-center focus:outline-none">
            <FaShoppingCart size={24} />
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {cart.length}
            </span>
          </button>

          {/* Menú desplegable del carrito */}
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white text-black shadow-lg rounded-lg p-4 z-10">
              <h2 className="text-lg font-bold mb-4">Tu carrito de compras</h2>

              {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span>{item.name} - ${item.price} x {item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 text-lg font-semibold">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>

              {cart.length > 0 && (
                <button
                  onClick={checkout}
                  className="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg w-full hover:bg-green-600"
                >
                  Finalizar compra
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
