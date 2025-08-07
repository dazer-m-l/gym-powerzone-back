const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Clase = require('./clasesModel');
const Entrenador = require('./coatchModels');

const Servicio = sequelize.define('Servicio', {
  clase_entrenador_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clase_id: DataTypes.INTEGER,
  entrenador_id: DataTypes.INTEGER
}, {
  tableName: 'clase_entrenador',
  timestamps: false
});

// Relaciones
Servicio.belongsTo(Clase, { foreignKey: 'clase_id' });
Servicio.belongsTo(Entrenador, { foreignKey: 'entrenador_id' });

module.exports = Servicio;
