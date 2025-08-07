const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Membresia = sequelize.define('Membresia', {
  membresia_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  precio_membresia: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fecha_expiracion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'membresia',
  timestamps: false,
});

module.exports = Membresia;
