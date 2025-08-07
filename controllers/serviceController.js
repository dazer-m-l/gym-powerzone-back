const Servicio = require('../models/serviceModels');
const Clase = require('../models/clasesModel');
const Entrenador = require('../models/coatchModels');

exports.getAll = async (req, res) => {
  try {
    const servicios = await Servicio.findAll({
      include: [
        {
          model: Clase,
          as: 'Clase',
          attributes: ['nombre_clase', 'descripcion', 'precio_clase', 'imagen_url']
        },
        {
          model: Entrenador,
          as: 'Entrenador',
          attributes: ['nombre_entrenador']
        }
      ]
    });

    const formatted = servicios.map(s => ({
      servicio_id: s.clase_entrenador_id,
      clase_id: s.clase_id,
      entrenador_id: s.entrenador_id,
      nombre_clase: s.Clase?.nombre_clase,
      descripcion: s.Clase?.descripcion,
      precio: s.Clase?.precio_clase,
      imagen_url: s.Clase?.imagen_url,
      nombre_entrenador: s.Entrenador?.nombre_entrenador
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios', error });
  }
};

exports.getById = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id, {
      include: [
        {
          model: Clase,
          as: 'Clase',
          attributes: ['nombre_clase', 'descripcion', 'precio_clase', 'imagen_url']
        },
        {
          model: Entrenador,
          as: 'Entrenador',
          attributes: ['nombre_entrenador']
        }
      ]
    });

    if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });

    res.json({
      servicio_id: servicio.clase_entrenador_id,
      clase_id: servicio.clase_id,
      entrenador_id: servicio.entrenador_id,
      nombre_clase: servicio.Clase?.nombre_clase,
      descripcion: servicio.Clase?.descripcion,
      precio: servicio.Clase?.precio_clase,
      imagen_url: servicio.Clase?.imagen_url,
      nombre_entrenador: servicio.Entrenador?.nombre_entrenador
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el servicio', error });
  }
};

exports.create = async (req, res) => {
  try {
    const { clase_id, entrenador_id } = req.body;
    const nuevo = await Servicio.create({ clase_id, entrenador_id });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el servicio', error });
  }
};

exports.update = async (req, res) => {
  try {
    const { clase_id, entrenador_id } = req.body;
    const servicio = await Servicio.findByPk(req.params.id);

    if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });

    await servicio.update({ clase_id, entrenador_id });
    res.json({ message: 'Servicio actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el servicio', error });
  }
};

exports.patch = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);

    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    await servicio.update(req.body);

    res.json({ message: 'Servicio actualizado parcialmente', servicio });
  } catch (error) {
    console.error('Error en PATCH Servicio:', error.message);
    res.status(500).json({ message: 'Error al actualizar parcialmente el servicio', error });
  }
};

exports.delete = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });

    await servicio.destroy();
    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el servicio', error });
  }
};
