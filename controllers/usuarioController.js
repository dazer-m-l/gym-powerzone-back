const Usuario = require('../models/usuarioModel');

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password_hash'] }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const [updated] = await Usuario.update(req.body, {
      where: { id_usuario: req.params.id }
    });

    if (updated === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado o sin cambios' });
    }

    const usuarioActualizado = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['password_hash'] }
    });

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
  }
};

const patchUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.update(req.body);

    const usuarioActualizado = await Usuario.findByPk(req.params.id, {
      attributes: { exclude: ['password_hash'] }
    });

    res.json({ mensaje: 'Usuario actualizado parcialmente', usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar parcialmente el usuario' });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  try {
    const deleted = await Usuario.destroy({
      where: { id_usuario: req.params.id }
    });

    if (deleted === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  patchUsuario,
  eliminarUsuario
};
