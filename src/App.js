import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './products.components/dashboard.js';
import Login from './users.components/loginuser.js';
import Register from './users.components/registeruser.js';
import Header from './products.components/header.js';
import { CartProvider } from './products.components/cart.js';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <div className="container">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
