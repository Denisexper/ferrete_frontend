import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './products.components/product.list.js'; // Asegúrate de que la ruta de importación sea correcta
import Login from './users.components/loginuser.js';

function App() {
  return (
    <Router>
    
        <h1 className="text-5xl font-bold text-center mb-10">
          FERRETERIA EL CORRAL
        </h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      
    </Router>
  );
}

export default App;




