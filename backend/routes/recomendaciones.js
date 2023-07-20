const express = require('express');
const router = express.Router();
const Producto = require('../models/mg_productos');
require('dotenv').config(); // Cargar las variables de entorno desde .env

router.get("/purchase", async (req, res) => {
    try {
        return res.json([    // FORMATO QUE ESPERA EL FRONTEND
            {   
                name: "Producto 1 desde el Back",
                category: "Categoria 1",
                price: 199
            },
            {
                name: "Producto 2 desde el Back",
                category: "Categoria 2",
                price: 299
            },
            {
                name: "Producto 3 desde el Back",
                category: "Categoria 3",
                price: 399
            }
        ]) 
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
                category: product.category,
                quantity: item.quantity,
                price: product.price
            }
            compras_json.push(product_json);
        }
        compras_json; /// JSON CON LAS COMPRASS!!!!!!!!!!!
        
      } catch (error) {
        console.error('Error getting products', error);
        return res.sendStatus(400);
        // Manejar el error, por ejemplo, enviando una respuesta de error al cliente
      }
})

router.get("/cart", async (req, res) => {
    try {
        return res.json([ // FORMATO QUE ESPERA EL FRONTEND
            {
                name: "Producto 1 desde el Back",
                category: "Categoria 1",
                price: 199
            },
            {
                name: "Producto 2 desde el Back",
                category: "Categoria 2",
                price: 299
            },
            {
                name: "Producto 3 desde el Back",
                category: "Categoria 3",
                price: 399
            }
        ]) 
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
        carrito_json; ////// JSON CON LOS PRODUCTOS DEL CARRITO!
    }
      } catch (error) {
        console.error('Error getting products', error);
        return res.sendStatus(400);
        // Manejar el error, por ejemplo, enviando una respuesta de error al cliente
      }
})
    
module.exports = router;