const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ItemCarrito = sequelize.define('ItemCarrito', {
  id_item_carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_carrito: {
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
    validate: {
      min: 1
    }
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'items_carrito',
  timestamps: false,
});

module.exports = ItemCarrito;