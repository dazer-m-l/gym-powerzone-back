const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/serviceController');

router.get('/', servicioController.getAll);
router.get('/:id', servicioController.getById);
router.post('/', servicioController.create);
router.put('/:id', servicioController.update);
router.patch('/:id', servicioController.patch);
router.delete('/:id', servicioController.delete);

module.exports = router;
