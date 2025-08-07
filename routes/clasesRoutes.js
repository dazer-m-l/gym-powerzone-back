const express = require('express');
const router = express.Router();
const claseController = require('../controllers/clasesController');

router.get('/', claseController.getAll);
router.get('/:id', claseController.getById);
router.post('/', claseController.create);
router.put('/:id', claseController.update);
router.patch('/:id', claseController.modificarParcial);
router.delete('/:id', claseController.delete);

module.exports = router;
