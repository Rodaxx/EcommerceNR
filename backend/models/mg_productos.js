// models/producto.js
const mongoose = require('mongoose');

// Definir el esquema para la colección "productos"
const productoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specs: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
});

// Crear el modelo para la colección "productos"
const Producto = mongoose.model('productos', productoSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Producto;
