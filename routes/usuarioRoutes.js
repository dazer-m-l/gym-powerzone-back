const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  patchUsuario,
  eliminarUsuario
} = require('../controllers/usuarioController');

router.get('/', verificarToken, obtenerUsuarios);
router.get('/:id', verificarToken, obtenerUsuarioPorId);
router.put('/:id', verificarToken, actualizarUsuario);
router.patch('/:id', verificarToken, patchUsuario);
router.delete('/:id', verificarToken, eliminarUsuario);

module.exports = router;
