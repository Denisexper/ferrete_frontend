import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './products.components/product.list.js'; // Asegúrate de que la ruta de importación sea correcta

function App() {
  return (
    <Router>
      <div>
        <h1>FERRETERIA EL CORRAL</h1>
        <Routes>
          {/* <Route path="/" element={<h2>Home Page</h2>} /> */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




