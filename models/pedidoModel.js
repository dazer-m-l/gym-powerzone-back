const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pedido = sequelize.define('Pedido', {
  id_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_pedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  total_pedido: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado_pedido: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  direccion_envio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  metodo_pago: {
    type: DataTypes.STRING(50)
  },
  id_transaccion_pago: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'pedidos',
  timestamps: false
});

module.exports = Pedido;
