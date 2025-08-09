require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const sequelize = require('./config/db');
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

// Rutas
app.use('/api/clases', require('./routes/clasesRoutes'));
app.use('/api/entrenadores', require('./routes/coatchRoutes'));
app.use('/api/horarios', require('./routes/scheludesRoutes'));
app.use('/api/leads', require('./routes/leandsRoutes'));
app.use('/api/membresias', require('./routes/memberRoutes'));
app.use('/api/clase_entrenador', require('./routes/serviceRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/carritos', require('./routes/carritoRoutes'));
app.use('/api/pedidos', require('./routes/pedidoRoutes'));
app.use('/api/items-pedido', require('./routes/itemPedidoRoutes'));

app.get('/', (req, res) => {
  res.send('Backend GYM PowerZone funcionando en Railway');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
