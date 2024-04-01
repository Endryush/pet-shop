import Sequelize from 'sequelize'
import db from '../repositories/db.js'

const Owner = db.define('owners', {
  ownerId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
}, { underscored: true })

export default Owner