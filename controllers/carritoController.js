const Carrito = require('../models/carritoModel');

// GET all
const obtenerCarritos = async (req, res) => {
  try {
    const carritos = await Carrito.findAll();
    res.json(carritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
};

// GET by ID
const obtenerCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findByPk(req.params.id);
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// POST
const crearCarrito = async (req, res) => {
  try {
    const nuevoCarrito = await Carrito.create(req.body);
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito', detalle: error.message });
  }
};

// PUT (completo)
const actualizarCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findByPk(req.params.id);
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    await carrito.update(req.body);
    res.json({ mensaje: 'Carrito actualizado correctamente', carrito });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito', detalle: error.message });
  }
};

// PATCH (parcial)
const modificarCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findByPk(req.params.id);
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    await carrito.update(req.body);
    res.json({ mensaje: 'Carrito modificado correctamente', carrito });
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar el carrito' });
  }
};

// DELETE
const eliminarCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findByPk(req.params.id);
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    await carrito.destroy();
    res.json({ mensaje: 'Carrito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
};

module.exports = {
  obtenerCarritos,
  obtenerCarrito,
  crearCarrito,
  actualizarCarrito,
  modificarCarrito,
  eliminarCarrito
};
