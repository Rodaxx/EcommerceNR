import React, { useState, useEffect  } from 'react';

const Compras = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState([]);

  const getTotal  = async () => {
    try {
      const response = await fetch('http://localhost:2000/purchase/total');
      const data = await response.json();
      setTotal(data.total);
    } catch (error) {
      console.error('Error al obtener el total del carrito:', error);
    }
  };

  const getCompras = async () => {
    try {
      const response = await fetch('http://localhost:2000/purchase/get');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener los productos del carrito:', error);
    }
  };

  useEffect(() => {
    getCompras();
    getTotal();
  }, []);

  return (
    <div className="mt-3 text-lg bg-gray flex justify-center">
      <div className="p-2 bg-gray-100 w-4/5 rounded-lg">
        <h2 className="px-4 py-2">Mis compras</h2>
        {productos.map((producto) => (
          <div className="grid grid-cols-3 my-2 rounded-lg border p-4 bg-white">
            <h3>{producto.name}</h3>
            <p>Precio: ${producto.price}</p>
            <p>Cantidad: {producto.quantity}</p>
          </div>
        ))}
        <div className='flex justify-center'>
          <h2 className="px-4 py-2">Total: ${total}</h2>
        </div>
      </div>
    </div>
  );
};

export default Compras;
