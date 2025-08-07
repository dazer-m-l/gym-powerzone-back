const ItemPedido = require('../models/itemPedidoModel');

exports.crearItem = async (req, res) => {
  try {
    const item = await ItemPedido.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el item del pedido', detalle: error.message });
  }
};

exports.obtenerItems = async (req, res) => {
  try {
    const items = await ItemPedido.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los items del pedido' });
  }
};

exports.obtenerItemPorId = async (req, res) => {
  try {
    const item = await ItemPedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el item del pedido' });
  }
};

exports.actualizarItem = async (req, res) => {
  try {
    const item = await ItemPedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });

    await item.update(req.body);
    res.json({ mensaje: 'Item actualizado correctamente', item });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar item del pedido' });
  }
};

exports.modificarItem = async (req, res) => {
  try {
    const item = await ItemPedido.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });

    await item.update(req.body);
    res.json({ mensaje: 'Item modificado parcialmente', item });
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar item del pedido' });
  }
};

exports.eliminarItem = async (req, res) => {
  try {
    const eliminado = await ItemPedido.destroy({ where: { id_item_pedido: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'Item no encontrado' });

    res.json({ mensaje: 'Item eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar item del pedido' });
  }
};
