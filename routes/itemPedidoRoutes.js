const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemPedidoController');

router.post('/', controller.crearItem);
router.get('/', controller.obtenerItems);
router.get('/:id', controller.obtenerItemPorId);
router.put('/:id', controller.actualizarItem);
router.patch('/:id', controller.modificarItem);
router.delete('/:id', controller.eliminarItem);

module.exports = router;
