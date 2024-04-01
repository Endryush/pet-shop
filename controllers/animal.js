import animalService from "../services/animal.js";

async function getAnimals (req, res, next) {
  try {
    res.status(200).send(await animalService.getAnimals())

    logger.info('GET /animals')
  } catch (error) {
    next(error)
  }
}

async function getAnimalById (req, res, next) {
  try {
    const response = await animalService.getAnimalById(req.params.id)
    if (!response) res.status(404).send({ message: 'Animal not found' })
    
    res.status(200).send(response)

    logger.info('GET /animal by ID')
  } catch (error) {
    next(error)
  }
}

async function insertAnimal (req, res, next) {
  try {
    const animal = req.body
  
    if (!animal.name || !animal.type || !animal.ownerId) {
      throw new Error('Name, type and ownerId fields are required')
    }

    res.status(201).send(await animalService.insertAnimal(animal))

    logger.info(`POST em /animal ${JSON.stringify(animal)}`)
  } catch (error) {
    next(error)
  }
}

async function updateAnimal (req, res, next) {
  try {
    const animal = req.body
  
    if (!animal.name || !animal.type || !animal.ownerId || !animal.animalId) {
      throw new Error('name, ownerId, animalId and type fields are required')
    }

    res.status(201).send(await animalService.updateAnimal(animal))

    logger.info(`PUT em /animal ${JSON.stringify(animal)}`)
  } catch (error) {
    next(error)
  }
}

async function deleteAnimal (req, res, next) {
  try {
    res.status(200).send(await animalService.deleteAnimal(req.params.id))

    logger.info(`DELETE em /animal by ID`)
  } catch (error) {
    next(error)
  }
}

async function getAnimalByOwner (req, res, next) {
  try {
    const ownerId = req.query.ownerId
    if (!ownerId) throw new Error('Send a valid owner ID')

    const response = await animalService.getAnimalByOwner(ownerId)
    if (!response) res.status(404).send({ message: 'Any animals found' })

    res.status(200).send(response)
  } catch (error) {
    next(error)
  }
}

export default {
  getAnimals,
  insertAnimal,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  getAnimalByOwner
}
