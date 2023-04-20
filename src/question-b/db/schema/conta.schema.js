import { Sequelize } from 'sequelize';
import db from '../db.js';

const Conta = db.define('conta', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  numero_medidor: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  responsavel_medidor: {
    type: Sequelize.STRING,
    allowNull: true
  },
  volume_consumido: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  custo_por_metro_cubico: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  custo_total: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
});

export default Conta;