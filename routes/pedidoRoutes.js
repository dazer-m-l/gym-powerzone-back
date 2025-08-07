const express = require('express');
const router = express.Router();
const {
  obtenerPedidos,
  obtenerPedido,
  crearPedido,
  actualizarPedido,
  modificarPedido,
  eliminarPedido
} = require('../controllers/pedidoController');

router.get('/', obtenerPedidos);
router.get('/:id', obtenerPedido);
router.post('/', crearPedido);
router.put('/:id', actualizarPedido);
router.patch('/:id', modificarPedido);
router.delete('/:id', eliminarPedido);

module.exports = router;
