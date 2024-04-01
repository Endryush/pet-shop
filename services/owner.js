import ownerRepository from "../repositories/owner.js";
import animalRepository from "../repositories/animal.js";

async function insertOwner (owner) {
  return ownerRepository.insertOwner(owner)
}

async function getOwners () {
  return await ownerRepository.getOwners(); 
}

async function getOwnerById (id) {
  return await  ownerRepository.getOwnerById(id);
}

async function updateOwner (owner) {
  return ownerRepository.updateOwner(owner)
}

async function deleteOwner (id) {
  const owner = await getOwnerById(id);
  if (!owner) throw new Error('The Owner with the given ID was not found.');

  const animalsByOwner =  await animalRepository.getAnimalByOwner(id)
  if (animalsByOwner?.length > 0)  throw new Error('The Owner with the given ID has animals registered.');

  return await ownerRepository.deleteOwner(id)
}

export default {
  insertOwner,
  getOwners,
  getOwnerById,
  updateOwner,
  deleteOwner
}