import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Carrito = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar el carrito desde localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
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
    })
  };

  // Calcular el total del carrito
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
    })
    setCart([]); // Vaciar el carrito
    localStorage.removeItem('cart'); // Eliminar el carrito de localStorage
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Tu carrito de compras</h2>

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
  );
};

export default Carrito;
