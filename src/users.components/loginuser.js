import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la redirección

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook de React Router para redirigir

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }), // Enviar el email y la contraseña
      credentials: 'include' // Incluir credenciales si estás manejando sesiones o cookies
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === 'User logged in successfully') {
          // Guarda los datos del usuario en localStorage
          const userData = {
            name: data.name,  // Nombre del usuario desde la respuesta
            email: data.email, // Email desde la respuesta
            avatar: data.avatar || 'https://via.placeholder.com/150' // Imagen del usuario, usar una genérica si no hay
          };
          localStorage.setItem('user', JSON.stringify(userData)); // Guardar en localStorage

          // Redirigir al dashboard
          navigate('/dashboard');
        } else {
          throw new Error('Login failed');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        setError('Invalid email or password');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-700">¿No tienes una cuenta?</p>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;


