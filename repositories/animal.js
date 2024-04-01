import AnimalModel from '../models/animal.js'


async function insertAnimal (animal) {
  try {
    return AnimalModel.create(animal)
  } catch (error) {
    throw error;
  }
}

async function getAnimals () {
  try {
    return await AnimalModel.findAll()
  } catch (error) {
    throw error;
  }
}

async function getAnimalById (id) {
  try {
    return await AnimalModel.findByPk(id)
  } catch (error) {
    throw error;
  }
}

async function updateAnimal (animal) {
  try {
    await AnimalModel.update(
      {
        name: animal.name,
        type: animal.phone,
        ownerId: animal.ownerId
      }, 
      {
        where: { animalId: animal.animalId } 
      }
    )

    return getAnimalById(animal.animalId);
  } catch (error) {
    throw error
  }
}

async function deleteAnimal (id) {
  try {
    await AnimalModel.destroy({
      where: { animalId: id }
    })

    return {
      'message': 'Deleted successfully',
    }
  } catch (error) {
    throw error;
  }
}

async function getAnimalByOwner (id) {
  try {
    return await AnimalModel.findOne({ where: { ownerId: id } })
  } catch (error) {
    throw error
  }
}


export default {
  insertAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  getAnimalByOwner
}