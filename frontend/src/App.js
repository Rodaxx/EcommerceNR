import React, { useState } from 'react';
import Carrito from './components/Carrito';
import Compras from './components/Compras'
import Productos from './components/Productos';
import RecomendacionesCompras from './components/RecomCompras';
import RecomendacionesCarrito from './components/RecomCarrito';

function App() {
  const [cartVisible, setCartVisible] = useState(true);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="min-h-screen">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div className="text-lg bg-black p-5 text-white content-center flex justify-center">
        <div className="flex item-center justify-between w-4/5">
          <h1>ECommerce NR</h1>
          <button className="material-symbols-outlined" onClick={toggleCart}>
            shopping_cart
          </button>
        </div>
      </div>

      {cartVisible && <Carrito />}
      <RecomendacionesCarrito></RecomendacionesCarrito>
      <Compras></Compras>
      <RecomendacionesCompras></RecomendacionesCompras>
      <Productos></Productos>
    </div>
  );
}

export default App;
