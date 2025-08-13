const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemCarritoController');

router.post('/', controller.crearItem);                    
router.get('/', controller.obtenerItems);                 
router.get('/carrito/:id_carrito', controller.obtenerItemsPorCarrito);
router.get('/:id', controller.obtenerItemPorId);          
router.put('/:id', controller.actualizarItem);            
router.patch('/:id', controller.modificarItem);           
router.delete('/:id', controller.eliminarItem);           
router.delete('/carrito/:id_carrito', controller.vaciarCarrito); 

module.exports = router;