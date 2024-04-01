import ServiceRepository from "../repositories/service.js";
import OwnerRepository from "../repositories/owner.js";
import AnimalRepository from "../repositories/animal.js";

async function insertService (service) {
  return await ServiceRepository.insertService(service)
}

async function getServices () {
  return await ServiceRepository.getServices()
}

async function getServiceById (id) {
  return await ServiceRepository.getServiceById(id)
}

async function updateService (service) {
  return await ServiceRepository.updateService(service)
}

async function deleteService (id) {
  return await ServiceRepository.deleteService(id)
}

async function getServicesByOwnerId (ownerId) {
  try {
    if (!await OwnerRepository.getOwnerById(ownerId)) throw new Error('This owner not found')
    
    const ownerAnimals = await AnimalRepository.getAnimalByOwner(ownerId)

    if (!ownerAnimals?.length > 0) throw new Error('any animals registered for this owner')
  
    const services = []
    await Promise.all(ownerAnimals.map(async animal => {
      const servicesByAnimal = await ServiceRepository.getServicesByAnimalId(animal.animalId)
      if (servicesByAnimal?.length > 0) {
        services.push(
          {
            animal: animal,
            services: servicesByAnimal
          }
        )
        return 
      }
    }))

    return services
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  insertService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByOwnerId
}