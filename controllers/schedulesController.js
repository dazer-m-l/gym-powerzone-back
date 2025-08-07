const Horario = require('../models/schedulesModels');

exports.getAll = async (req, res) => {
  try {
    const horarios = await Horario.findAll();
    res.json(horarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);
    if (horario) {
      res.json(horario);
    } else {
      res.status(404).json({ message: 'Horario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevoHorario = await Horario.create(req.body);
    res.status(201).json(nuevoHorario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);
    if (horario) {
      await horario.update(req.body);
      res.json(horario);
    } else {
      res.status(404).json({ message: 'Horario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.patch = async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);

    if (!horario) {
      return res.status(404).json({ message: 'Horario no encontrado' });
    }

    await horario.update(req.body);

    res.json({ message: 'Horario actualizado parcialmente', horario });
  } catch (err) {
    console.error('Error en PATCH Horario:', err.message);
    res.status(500).json({ message: 'Error al actualizar parcialmente el horario', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const horario = await Horario.findByPk(req.params.id);
    if (horario) {
      await horario.destroy();
      res.json({ message: 'Horario eliminado' });
    } else {
      res.status(404).json({ message: 'Horario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
