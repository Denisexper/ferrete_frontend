import React, { useState, useEffect } from 'react';

function ProductList() {
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

  return (
    <div>
      <h1 className='text-5xl font-bold text-center text-gray-700 mb-10'>Product List</h1>
      {error && <p>{error}</p>}
      <ul>
        {products.map((product, index) => (
          <li key={product.id || index}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;