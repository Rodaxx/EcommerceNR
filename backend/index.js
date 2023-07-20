require('dotenv').config(); 

const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');

const products_routes = require('./routes/productos')
const cart_routes = require('./routes/carrito')
const purchase_routes = require('./routes/compras')
const recomendation_routes = require('./routes/recomendaciones')

const app = express();
const PORT = 2000;

app.use(express.json());
app.use(cors());

app.use('/products', products_routes);
app.use('/cart', cart_routes);
app.use('/purchase', purchase_routes);
app.use('/recomendations', recomendation_routes);

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
