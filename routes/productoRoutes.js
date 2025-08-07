const express = require('express');
const router = express.Router();
const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  patchProducto,
  eliminarProducto
} = require('../controllers/productoController');

router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.patch('/:id', patchProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;
