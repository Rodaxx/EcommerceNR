import React, { useState, useEffect  } from 'react';

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const getTotalCarrito = async () => {
    try {
      const response = await fetch('http://localhost:2000/cart/total');
      const data = await response.json();
      setTotal(data.total);
    } catch (error) {
      console.error('Error al obtener el total del carrito:', error);
    }
  };

  const getProductosCarrito = async () => {
    try {
      const response = await fetch('http://localhost:2000/cart/get');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener los productos del carrito:', error);
    }
  };

  // Función para agregar un producto al carrito
  const confirmarCompra = async () => {
    try {
      await fetch('http://localhost:2000/cart/confirm');
      window.location.reload();
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };

  const eliminarProducto = async (nombreProducto) => {
    try {
      await fetch('http://localhost:2000/cart/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: nombreProducto,
          quantity: 1, 
        }),
      });
      getProductosCarrito();
      getTotalCarrito();
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  useEffect(() => {
    getProductosCarrito();
    getTotalCarrito();
  }, []);

  return (
    <div className="mt-3 text-lg bg-gray flex justify-center">
      <div className="p-2 bg-gray-100 w-4/5 rounded-lg">
        <h2 className="px-4 py-2">Mi carrito</h2>
        {productos.map((producto) => (
          <div className="grid grid-cols-4 my-2 rounded-lg border p-4 bg-white">
            <h3>{producto.name}</h3>
            <p>Precio: ${producto.price}</p>
            <p>Cantidad: {producto.quantity}</p>
            <button className='text-red-700' onClick={() => eliminarProducto(producto.name)}>Eliminar</button>
          </div>
        ))}
        <div className='flex justify-center'>
          <h2 className="px-4 py-2">Total: ${total}</h2>
          <button className='text-green-700' onClick={confirmarCompra}>Confirmar compra</button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
