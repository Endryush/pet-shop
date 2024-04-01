import Sequelize from 'sequelize'
import db from '../repositories/db.js'
import Animal from './animal.js'

const Service = db.define('services', {
  serviceId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  }, 
}, { underscored: true })

Service.belongsTo(Animal, { foreignKey: 'animalId' })

export default Service