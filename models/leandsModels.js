const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Lead = db.define('leads', {
  leads_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_autor: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_envio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'leads'
});

module.exports = Lead;
