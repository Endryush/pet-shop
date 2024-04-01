import Service from "../services/service.js";


async function insertService (req, res, next) {
  try {
    const service = req.body

    if (!service.description || !service.value || !service.animalId) throw new Error ('all fields are required')

    res.status(201).send(await Service.insertService(service))
    logger.info(`POST em /service ${JSON.stringify(service)}`)
  } catch (error) {
    next(error)
  }
}

async function getServices (req, res, next) {
  try {
    res.status(200).send(await Service.getServices())
    logger.info('GET  em /services')
  } catch (error) {
    next(error)
  }
}

async function getServiceById (req, res, next) {
  try {
    res.status(200).send(await Service.getServiceById(req.params.id))
    logger.info('GET  em /services/id: ' + req.params.id)
  } catch (error) {
    next(error)
  }
}

async function updateService (req, res, next) {
  try {
    const service = req.body

    if (!service.description || !service.value || !service.animalId || !service.serviceId) throw new Error ('all fields are required')

    res.status(200).send(await Service.updateService(service))
    logger.info(`UPDATE  em /services => ${service}`)
  } catch (error) {
    next(error)
  }
} 

async function deleteService (req, res, next) {
  try {
    res.status(200).send(await Service.deleteService(req.params.id))
    logger.info(`DELETE em /service by ID`)
  } catch (error) {
    next(error)
  }
}

async function getServicesByOwnerId (req, res, next) {
  try {
    const { ownerId } = req.query
    if (!ownerId) throw new Error('Send a owner to search services!')

    res.status(200).send(await Service.getServicesByOwnerId(parseInt(ownerId)))
    logger.info(`GET em /service/owner?ownerId`)
  } catch (error) {
    next(error)
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