const Pedido = require('../models/pedidoModel');

// GET all
const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

// GET by ID
const obtenerPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};

// POST
const crearPedido = async (req, res) => {
  try {
    const nuevoPedido = await Pedido.create(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido', detalle: error.message });
  }
};

// PUT
const actualizarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    await pedido.update(req.body);
    res.json({ mensaje: 'Pedido actualizado correctamente', pedido });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
};

// PATCH
const modificarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    await pedido.update(req.body);
    res.json({ mensaje: 'Pedido modificado correctamente', pedido });
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar el pedido' });
  }
};

// DELETE
const eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
    await pedido.destroy();
    res.json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
};

module.exports = {
  obtenerPedidos,
  obtenerPedido,
  crearPedido,
  actualizarPedido,
  modificarPedido,
  eliminarPedido
};
