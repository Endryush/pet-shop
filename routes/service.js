import express from "express";
import serviceController from "../controllers/service.js";

const router = express.Router()

router
  .get('/', serviceController.getServices)
  .get('/owner', serviceController.getServicesByOwnerId)
  .get('/:id', serviceController.getServiceById)
  .post('/', serviceController.insertService)
  .put( '/', serviceController.updateService)
  .delete('/:id', serviceController.deleteService)


export default router