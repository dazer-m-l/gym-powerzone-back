const ItemCarrito = require('../models/itemCarritoModel');
const Producto = require('../models/productoModel');

exports.crearItem = async (req, res) => {
  try {
    const { id_carrito, id_producto, cantidad } = req.body;

    const producto = await Producto.findByPk(id_producto);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }
    const itemExistente = await ItemCarrito.findOne({
      where: { id_carrito, id_producto }
    });

    if (itemExistente) {
      const nuevaCantidad = itemExistente.cantidad + cantidad;
      
      if (nuevaCantidad > producto.stock) {
        return res.status(400).json({ error: 'Stock insuficiente para esta cantidad' });
      }

      await itemExistente.update({ 
        cantidad: nuevaCantidad,
        precio_unitario: producto.precio
      });
      
      return res.status(200).json({ 
        mensaje: 'Cantidad actualizada en el carrito', 
        item: itemExistente 
      });
    } else {
      const nuevoItem = await ItemCarrito.create({
        id_carrito,
        id_producto,
        cantidad,
        precio_unitario: producto.precio
      });
      
      return res.status(201).json({
        mensaje: 'Producto agregado al carrito',
        item: nuevoItem
      });
    }

  } catch (error) {
    res.status(500).json({ 
      error: 'Error al crear el item del carrito', 
      detalle: error.message 
    });
  }
};

exports.obtenerItems = async (req, res) => {
  try {
    const items = await ItemCarrito.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los items del carrito' });
  }
};

exports.obtenerItemsPorCarrito = async (req, res) => {
  try {
    const { id_carrito } = req.params;
    
    const items = await ItemCarrito.findAll({
      where: { id_carrito },
      include: [{
        model: Producto,
        attributes: ['nombre_producto', 'descripcion', 'imagen_url', 'stock']
      }]
    });

    let totalItems = 0;
    let totalPrecio = 0;

    const itemsConSubtotal = items.map(item => {
      const subtotal = parseFloat(item.cantidad * item.precio_unitario);
      totalItems += item.cantidad;
      totalPrecio += subtotal;

      return {
        ...item.toJSON(),
        subtotal
      };
    });

    res.json({
      items: itemsConSubtotal,
      resumen: {
        total_items: totalItems,
        total_precio: totalPrecio.toFixed(2)
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener items del carrito' });
  }
};

exports.obtenerItemPorId = async (req, res) => {
  try {
    const item = await ItemCarrito.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el item del carrito' });
  }
};

exports.actualizarItem = async (req, res) => {
  try {
    const { cantidad } = req.body;
    const item = await ItemCarrito.findByPk(req.params.id);
    
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });

    if (cantidad) {
      const producto = await Producto.findByPk(item.id_producto);
      if (producto && producto.stock < cantidad) {
        return res.status(400).json({ error: 'Stock insuficiente' });
      }
    }

    await item.update(req.body);
    res.json({ mensaje: 'Item actualizado correctamente', item });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar item del carrito' });
  }
};

exports.modificarItem = async (req, res) => {
  try {
    const { cantidad } = req.body;
    const item = await ItemCarrito.findByPk(req.params.id);
    
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });

    if (cantidad) {
      const producto = await Producto.findByPk(item.id_producto);
      if (producto && producto.stock < cantidad) {
        return res.status(400).json({ error: 'Stock insuficiente' });
      }
    }

    await item.update(req.body);
    res.json({ mensaje: 'Item modificado parcialmente', item });
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar item del carrito' });
  }
};

exports.eliminarItem = async (req, res) => {
  try {
    const eliminado = await ItemCarrito.destroy({ 
      where: { id_item_carrito: req.params.id } 
    });
    
    if (!eliminado) return res.status(404).json({ error: 'Item no encontrado' });

    res.json({ mensaje: 'Item eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar item del carrito' });
  }
};

exports.vaciarCarrito = async (req, res) => {
  try {
    const { id_carrito } = req.params;
    
    const eliminados = await ItemCarrito.destroy({
      where: { id_carrito }
    });

    res.json({ 
      mensaje: `${eliminados} items eliminados del carrito`,
      items_eliminados: eliminados
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
};