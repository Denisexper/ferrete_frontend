import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './products.components/dashboard.js'; // Asegúrate de que la ruta de importación sea correcta
import Login from './users.components/loginuser.js'
import Register from './users.components/registeruser.js';
import Header from './products.components/header.js';

function App() {
  

  return (
    <Router>
      <Routes>
        {/* Ruta para el login (sin Header) */}
        <Route path="/" element={<Login />} />

        {/* Rutas con Header */}
        <Route
          path="*"
          element={
            <>
              <Header /> {/* El Header se muestra aquí */}
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;




