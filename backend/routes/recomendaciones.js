const express = require('express');
const router = express.Router();
const Producto = require('../models/mg_productos');
require('dotenv').config(); // Cargar las variables de entorno desde .env

const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'password'),);

router.get("/purchase", async (req, res) => {
    try {
        const session = driver.session('neo4j');
        const result = await session.run(  `MATCH (U:Usuario{name:'Testing_User'})-[:Bought]->(p:Product)
                                        WITH COLLECT(p.category) AS boughtCategories
                                        UNWIND boughtCategories AS category
                                        MATCH (recommendation :Product{category: category})
                                        RETURN recommendation;`)

        const recom = result.records.map(i=>i.get('recommendation').properties)

        let res_json = [];
        for (let i = 0; i<recom.length; i++){
            if (i == 5){
                break;
            }
            json = {
                name: recom[i].name,
                category: recom[i].category,
                price: recom[i].price.low

            }
            res_json.push(json);
        }
        return res.json(res_json);
      } catch (error) {
        console.error('Error getting products', error);
        return res.sendStatus(400);
        // Manejar el error, por ejemplo, enviando una respuesta de error al cliente
      }
})

router.get("/cart", async (req, res) => {
    try {
        const session = driver.session('neo4j');
        const result = await session.run(  `MATCH (U:Usuario{name:'Testing_User'})-[:Liked]->(p:Product)
                                        WITH COLLECT(p.category) AS boughtCategories
                                        UNWIND boughtCategories AS category
                                        MATCH (recommendation :Product{category: category})
                                        RETURN recommendation;`)

        const recom = result.records.map(i=>i.get('recommendation').properties)

        let res_json = [];
        for (let i = 0; i<recom.length; i++){
            if (i == 5){
                break;
            }
            json = {
                name: recom[i].name,
                category: recom[i].category,
                price: recom[i].price.low

            }
            res_json.push(json);
        }
        return res.json(res_json);
      } catch (error) {
        console.error('Error getting products', error);
        return res.sendStatus(400);
        // Manejar el error, por ejemplo, enviando una respuesta de error al cliente
      }
})
    
module.exports = router;