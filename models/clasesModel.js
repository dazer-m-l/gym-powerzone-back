const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Clase = sequelize.define('Clase', {
  clase_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_clase: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  precio_clase: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imagen_url: {
    type: DataTypes.STRING(255),
  },
}, {
  tableName: 'clase',
  timestamps: false,  // Si no usas createdAt/updatedAt
});

module.exports = Clase;
