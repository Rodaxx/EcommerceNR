const express = require('express');
const router = express.Router();
const Compras = require('../models/mg_compras'); 
const Producto = require('../models/mg_productos'); 

router.get('/get', async (req, res) => {
  try {
    const compras = await Compras.findOne(); 
    if (!compras) {
      return res.json([]);
    }
    let compras_json = [];
    for (let i = 0; i<compras.items.length; i++){
        const item = compras.items[i];
        const product = await Producto.findById(item.product);

        const product_json = {
            name: product.name,
            quantity: item.quantity,
            price: product.price
        }
        compras_json.push(product_json);
    }
    res.json(compras_json);
  } catch (error) {
    console.error('Error al obtener los productos del carrito:', error);
    res.sendStatus(500);
}});

router.get('/total', async (req, res) => {
    try {
      const compras = await Compras.findOne(); 
      if (!compras) {
        return res.json({ total: 0 });
      }
      
      let total = 0; 
  
      for (let i = 0; i < compras.items.length; i++) {
        const item = compras.items[i];
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

module.exports = router;

