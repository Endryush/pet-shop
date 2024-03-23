import ownerService from "../services/owner.js";

async function getOwners (req, res, next) {
  try {
    res.status(200).send(await ownerService.getOwners())

    logger.info('GET /owners')
  } catch (error) {
    next(error)
  }
}

async function getOwnerById (req, res, next) {
  try {
    const response = await ownerService.getOwnerById(req.params.id)
    if (!response) res.status(404).send({ message: 'Owner not found' })
    
    res.status(200).send(response)

    logger.info('GET /owner by ID')
  } catch (error) {
    next(error)
  }
}

async function insertOwner (req, res, next) {
  try {
    const owner = req.body
  
    if (!owner.name || !owner.phone) {
      throw new Error('Name and phone fields are required')
    }

    res.status(201).send(await ownerService.insertOwner(owner))

    logger.info(`POST em /owner ${JSON.stringify(owner)}`)
  } catch (error) {
    next(error)
  }
}

async function updateOwner (req, res, next) {
  try {
    const owner = req.body
  
    if (!owner.name || !owner.phone || !owner.owner_id) {
      throw new Error('Name, phone and owner_id  fields are required')
    }

    res.status(201).send(await ownerService.updateOwner(owner))

    logger.info(`PUT em /owner ${JSON.stringify(owner)}`)
  } catch (error) {
    next(error)
  }
}

async function deleteOwner (req, res, next) {
  try {
    res.status(200).send(await ownerService.deleteOwner(req.params.id))

    logger.info(`DELETE em /owner by ID`)
  } catch (error) {
    next(error)
  }
}

export default {
  getOwners,
  insertOwner,
  getOwnerById,
  updateOwner,
  deleteOwner
}
