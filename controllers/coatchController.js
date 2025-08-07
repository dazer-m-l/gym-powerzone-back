const Entrenador = require('../models/coatchModels');

exports.getAll = async (req, res) => {
  try {
    const entrenadores = await Entrenador.findAll();
    res.json(entrenadores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const entrenador = await Entrenador.findByPk(req.params.id);
    if (entrenador) {
      res.json(entrenador);
    } else {
      res.status(404).json({ message: 'Entrenador no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevoEntrenador = await Entrenador.create(req.body);
    res.status(201).json(nuevoEntrenador);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const entrenador = await Entrenador.findByPk(req.params.id);
    if (entrenador) {
      await entrenador.update(req.body);
      res.json(entrenador);
    } else {
      res.status(404).json({ message: 'Entrenador no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.modificarParcial = async (req, res) => {
  try {
    const entrenador = await Entrenador.findByPk(req.params.id);
    if (!entrenador) {
      return res.status(404).json({ message: 'Entrenador no encontrado' });
    }

    await entrenador.update(req.body);
    res.json({ message: 'Entrenador actualizado parcialmente', entrenador });
  } catch (err) {
    res.status(500).json({ error: 'Error al realizar la actualización parcial', detalle: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const entrenador = await Entrenador.findByPk(req.params.id);
    if (entrenador) {
      await entrenador.destroy();
      res.json({ message: 'Entrenador eliminado' });
    } else {
      res.status(404).json({ message: 'Entrenador no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
