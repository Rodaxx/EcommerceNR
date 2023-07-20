import React, { useState, useEffect } from 'react';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://localhost:2000/products/get');
        if (!response.ok) {
          throw new Error('Error al obtener los datos desde la API');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener los datos desde la API:', error);
      }
    };

    getProducts();
  }, []);

  // Función para añadir un producto al carrito
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

  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 flex w-4/5 justify-around my-2">
        {products.map((categoryData) => (
          <button
            key={categoryData.category}
            className={`px-6 py-2 font-lg ${
              selectedCategory === categoryData.category ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => handleCategoryClick(categoryData.category)}
          >
            {categoryData.category}
          </button>
        ))}
      </div>
      <div className="mt-4 w-4/5"> {/* Ajustamos el ancho para que use 4/5 del espacio total */}
        {selectedCategory &&
          products
            .find((categoryData) => categoryData.category === selectedCategory)
            .products.map((product) => (
              <div key={product.name} className="grid grid-cols-2 border border-gray-300 p-4 mb-4">
                <div className='flex justify-center aspect-w-1 aspect-h-1'>
                  <img src={"../img/"+product.img_url} alt={product.name} className="max-w-xs mb-2 object-cover" />
                </div>
                <div className='flex flex-col justify-center'>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600">{product.specs}</p>
                  <p className="text-gray-600">{"USD$ "+product.price}</p>
                  <button className="bg-blue-500 text-white mt-2 px-4 py-2" onClick={() => agregarAlCarrito(product.name)}>Añadir</button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Productos;
