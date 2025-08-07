const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ItemPedido = sequelize.define('ItemPedido', {
  id_item_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'items_pedido',
  timestamps: false,
});

module.exports = ItemPedido;
