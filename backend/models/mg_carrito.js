const mongoose = require('mongoose');

// Definir el esquema para la colección "carrito"
const carritoSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productos', // Referencia al esquema de productos
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

// Crear el modelo para la colección "carrito"
const Carrito = mongoose.model('Carritos', carritoSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Carrito;