import ServiceModel from '../models/service.js'

async function insertService (service) {
  try {
    return ServiceModel.create(service)
  } catch (error) {
    throw error
  }
}

async function getServices () {
  try {
    return ServiceModel.findAll()
  } catch (error) {
    throw error
  }
}

async function getServiceById (id) {
  try {
    return ServiceModel.findByPk(id)
  } catch (error) {
    throw error
  }
}
async function updateService (service) {
  try {
    await ServiceModel.update(
      {
        description: service.description,
        value: service.value,
        animalId: service.animalId
      }, 
      {
        where: { serviceId: service.serviceId } 
      }
    )

    return getServiceById(service.serviceId);
  } catch (error) {
    throw error
  }
}

async function deleteService (id) {
  try {
    await ServiceModel.destroy({
      where: { serviceId: id }
    })

    return {
      'message': 'Deleted successfully',
    }
  } catch (error) {
    throw error;
  }
}

async function getServicesByAnimalId (id) {
  try {
    return await ServiceModel.findAll({ where: { animalId: id } })
  } catch (error) {
    throw error
  }
}


export default {
  insertService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByAnimalId
}