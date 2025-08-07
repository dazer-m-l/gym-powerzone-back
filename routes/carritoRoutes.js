const express = require('express');
const router = express.Router();
const {
  obtenerCarritos,
  obtenerCarrito,
  crearCarrito,
  actualizarCarrito,
  modificarCarrito,
  eliminarCarrito
} = require('../controllers/carritoController');

router.get('/', obtenerCarritos);
router.get('/:id', obtenerCarrito);
router.post('/', crearCarrito);
router.put('/:id', actualizarCarrito);
router.patch('/:id', modificarCarrito);
router.delete('/:id', eliminarCarrito);

module.exports = router;
