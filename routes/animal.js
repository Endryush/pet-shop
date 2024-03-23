import express from "express";
import animalController from "../controllers/animal.js";

const router = express.Router()

router
  .get('/', animalController.getAnimals)
  .get('/owner', animalController.getAnimalByOwner)
  .get('/:id', animalController.getAnimalById)
  .post('/', animalController.insertAnimal)
  .put( '/', animalController.updateAnimal)
  .delete('/:id', animalController.deleteAnimal)


export default router