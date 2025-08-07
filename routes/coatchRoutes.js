const express = require('express');
const router = express.Router();
const entrenadorController = require('../controllers/coatchController');

router.get('/', entrenadorController.getAll);
router.get('/:id', entrenadorController.getById);
router.post('/', entrenadorController.create);
router.put('/:id', entrenadorController.update);
router.patch('/:id', entrenadorController.modificarParcial);
router.delete('/:id', entrenadorController.delete);

module.exports = router;
