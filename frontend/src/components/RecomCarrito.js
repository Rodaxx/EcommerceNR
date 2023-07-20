import React, { useState, useEffect  } from 'react';

const RecomendacionesCarrito = () => {
  const [productos, setProductos] = useState([]);

  const getRecomendacionesCompras = async () => {
    try {
      const response = await fetch('http://localhost:2000/recomendations/cart');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener los productos del carrito:', error);
    }
  };

  const agregarAlCarrito = async (productName) => {
    try {
      // Enviar la solicitud POST al backend para añadir el producto al carrito
      await fetch('http://localhost:2000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName,
          quantity: 1, // Siempre añadimos 1 unidad del producto
        }), // Enviar el nombre del producto y la cantidad en el cuerpo de la solicitud
      });
      window.location.reload();
    } catch (error) {
      console.error('Error al añadir el producto al carrito:', error);
    }
  };

  useEffect(() => {
    getRecomendacionesCompras();
  }, []);

  return (
    <div className="mt-3 text-lg bg-gray flex justify-center">
      <div className="p-2 bg-gray-100 w-4/5 rounded-lg">
        <h2 className="px-4 py-2">Algunas recomendaciones para tu carrito...</h2>
        {productos.map((producto) => (
          <div className="grid grid-cols-4 my-2 rounded-lg border p-4 bg-white">
            <h3>{producto.name}</h3>
            <p>Categoria: {producto.category}</p>
            <p>Precio: ${producto.price}</p>
            <button className="bg-blue-500 text-white mt-2 px-4 py-2" onClick={() => agregarAlCarrito(producto.name)}>Añadir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecomendacionesCarrito;
