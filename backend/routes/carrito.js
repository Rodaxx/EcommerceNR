const express = require('express');
const router = express.Router();
const Carrito = require('../models/mg_carrito'); 
const Producto = require('../models/mg_productos'); 
const Compras = require('../models/mg_compras')

const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'password'),);

const createRelation = async (productname,quantity) =>{
  const session = driver.session('neo4j');
  fecha_compra = '2001-01-01';
  client = 'Testing_User';
  const result = await session.run(`
  MATCH (U:Usuario{name: $client}), (P:Product{name: $productname})
  CREATE (U)-[B:Bought{quantity: $quantity, fecha_compra: $fecha_compra}]->(P)
  `, {
    client: client,
    productname: productname,
    quantity: quantity,
    fecha_compra: fecha_compra
  });};

const createRelationCart = async (productname) =>{
  const session = driver.session('neo4j');
  const result = await session.run(`
  MATCH(U:Usuario{name:'Testing_User'}),(P:Product{name:'${productname}'})CREATE (U)-[:Liked]->(P)
  `, {
    productname: productname,
  });};

router.post('/add', async (req, res) => {
  const { productName, quantity } = req.body; 

  try {
    const producto = await Producto.findOne({ name: productName });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    await createRelationCart(producto.name);

    const newItem = {
      product: producto._id,
      quantity: quantity,
    };

    let carrito = await Carrito.findOne(); 
    if (!carrito) {
      carrito = await Carrito.create({ items: [newItem] });
    } else {
      const existingItem = carrito.items.find((item) => item.product.toString() === producto._id.toString());

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        carrito.items.push(newItem);
      }
      await carrito.save(); 
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

router.get('/confirm', async (req, res) => {
  try {
    const carrito = await Carrito.findOne();

    if (!carrito) {
      return res.sendStatus(404);
    }

    const carritoProductos = carrito.items.map((item) => ({
      productId: item.product,
      quantity: item.quantity,
    }));

    const productosAComprar = {};
    carritoProductos.forEach((producto) => {
      const { productId, quantity } = producto;
      if (productosAComprar[productId]) {
        productosAComprar[productId] += quantity;
      } else {
        productosAComprar[productId] = quantity;
      }
    });

    let compraExistente = await Compras.findOne();

    if (!compraExistente) {
      compraExistente = new Compras({ items: [] });
    }

    for (const productId in productosAComprar) {
      if (productosAComprar.hasOwnProperty(productId)) {
        const product = await Producto.findById(productId);

        if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const cantidad = productosAComprar[productId];

        const itemCompraExistente = compraExistente.items.find(
          (item) => item.product.toString() === productId
        );

        createRelation(product.name, cantidad);
        if (itemCompraExistente) {
          itemCompraExistente.quantity += cantidad;
        } else {
          const itemCompra = {
            product: product._id,
            quantity: cantidad,
          };
          compraExistente.items.push(itemCompra);

        }
      }
    }

    await compraExistente.save();

    await Carrito.deleteOne();

    res.sendStatus(200);
  } catch (error) {
    console.error('Error al confirmar la compra:', error);
    res.sendStatus(500);
  }
});

router.get('/get', async (req, res) => {
  try {
    const carrito = await Carrito.findOne(); 
    if (!carrito) {
      return res.json([]);
    }
    let carrito_json = [];
    for (let i = 0; i<carrito.items.length; i++){
        const item = carrito.items[i];
        const product = await Producto.findById(item.product);

        const product_json = {
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description,
            specs: product.specs,
            quantity: item.quantity
        }
        
        carrito_json.push(product_json);
    }

    res.json(carrito_json);
  } catch (error) {
    console.error('Error al obtener los productos del carrito:', error);
    res.sendStatus(500);
}});

router.get('/total', async (req, res) => {
    try {
      const carrito = await Carrito.findOne(); 
      if (!carrito) {
        return res.json({ total: 0 });
      }
      
      let total = 0; 
  
      for (let i = 0; i < carrito.items.length; i++) {
        const item = carrito.items[i];
        const product = await Producto.findById(item.product);
  
        const subtotal = product.price * item.quantity;
        total += subtotal;
      }
  
      res.json({ total: total }); 
    } catch (error) {
      console.error('Error al obtener el total del carrito:', error);
      res.sendStatus(500);
    }
  });

router.post('/delete', async (req, res) => {
  const { productName, quantity } = req.body; 

  try {
    const producto = await Producto.findOne({ name: productName });
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    let carrito = await Carrito.findOne(); 
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const itemIndex = carrito.items.findIndex((item) => item.product.toString() === producto._id.toString());

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    const updatedQuantity = carrito.items[itemIndex].quantity - quantity;

    if (updatedQuantity <= 0) {
      carrito.items.splice(itemIndex, 1);
    } else {
      carrito.items[itemIndex].quantity = updatedQuantity;
    }

    await carrito.save(); 

    res.sendStatus(200); 
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

module.exports = router;

