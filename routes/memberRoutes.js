const express = require('express');
const router = express.Router();
const membresiaController = require('../controllers/memberControlller');

router.get('/', membresiaController.getAll);
router.get('/:id', membresiaController.getById);
router.post('/', membresiaController.create);
router.put('/:id', membresiaController.update);
router.patch('/:id', membresiaController.patch);
router.delete('/:id', membresiaController.delete);

module.exports = router;
