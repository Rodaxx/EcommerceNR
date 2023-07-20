const express = require('express');
const router = express.Router();
const Producto = require('../models/mg_productos');
require('dotenv').config(); // Cargar las variables de entorno desde .env


router.get("/get", async (req, res) => {
    try {
        // Realizar la consulta para obtener todos los productos
        const categories = await Producto.distinct('category');
        let res_json = [];
        for (let i = 0; i<categories.length; i++){
          let productsByCategories_json = {
              category: categories[i],
              products: []
          }
          const productsByCategory = await Producto.find({category: categories[i]});
          
          for (let j = 0; j<productsByCategory.length; j++){
              let product_json =  {
                  name: productsByCategory[j].name,
                  price: productsByCategory[j].price,
                  description: productsByCategory[j].description,
                  specs: productsByCategory[j].specs,
                  img_url: productsByCategory[j].img_url
              }
              productsByCategories_json.products.push(product_json);
          }
          res_json.push(productsByCategories_json);
        }
        return res.json(res_json).status(200);
        // Realizar cualquier lógica adicional con los productos obtenidos
        // Por ejemplo, aquí podrías renderizar una vista con los productos en una aplicación web
        // o enviar la lista de productos como respuesta al cliente en una API.
      } catch (error) {
        console.error('Error getting products', error);
        return res.sendStatus(400);
        // Manejar el error, por ejemplo, enviando una respuesta de error al cliente
      }
})
    
module.exports = router;