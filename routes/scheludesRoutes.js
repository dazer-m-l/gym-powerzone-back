const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/schedulesController');

router.get('/', horarioController.getAll);
router.get('/:id', horarioController.getById);
router.post('/', horarioController.create);
router.put('/:id', horarioController.update);
router.patch('/:id', horarioController.patch);
router.delete('/:id', horarioController.delete);

module.exports = router;
