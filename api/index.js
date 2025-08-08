require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(express.json());
app.use(cors());

const sequelize = require('../config/db');
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

// Rutas
app.use('/clases', require('../routes/clasesRoutes'));
app.use('/entrenadores', require('../routes/coatchRoutes'));
app.use('/horarios', require('../routes/scheludesRoutes'));
app.use('/leads', require('../routes/leandsRoutes'));
app.use('/membresias', require('../routes/memberRoutes'));
app.use('/clase_entrenador', require('../routes/serviceRoutes'));
app.use('/auth', require('../routes/authRoutes'));
app.use('/usuarios', require('../routes/usuarioRoutes'));
app.use('/categorias', require('../routes/categoriaRoutes'));
app.use('/productos', require('../routes/productoRoutes'));
app.use('/carritos', require('../routes/carritoRoutes'));
app.use('/pedidos', require('../routes/pedidoRoutes'));
app.use('/items-pedido', require('../routes/itemPedidoRoutes'));

app.get('/', (req, res) => {
  res.send('Backend GYM PowerZone funcionando en Vercel');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = serverless(app);
