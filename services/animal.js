import animalRepository from "../repositories/animal.js";

async function insertAnimal (animal) {
  return animalRepository.insertAnimal(animal)
}

async function getAnimals () {
  return await animalRepository.getAnimals(); 
}

async function getAnimalById (id) {
  return await  animalRepository.getAnimalById(id);
}

async function updateAnimal (animal) {
  return animalRepository.updateAnimal(animal)
}

async function deleteAnimal (id) {
  const animal = await getAnimalById(id);
  if (!animal) throw new Error('The Animal with the given ID was not found.');
  return await animalRepository.deleteAnimal(id)
}

async function getAnimalByOwner (id) {
  return await animalRepository.getAnimalByOwner(id);
}

export default {
  insertAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
  getAnimalByOwner
}