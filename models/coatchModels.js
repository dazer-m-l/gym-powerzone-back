const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Entrenador = sequelize.define('Entrenador', {
  entrenador_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_entrenador: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  especialidad: {
    type: DataTypes.STRING(100),
  },
  foto_url: {
    type: DataTypes.STRING(255),
  },
  contacto_entrenador: {
    type: DataTypes.STRING(100),
  },
}, {
  tableName: 'entrenador',
  timestamps: false,  // Desactiva createdAt / updatedAt
});

module.exports = Entrenador;
