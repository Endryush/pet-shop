import OwnerModel from '../models/owner.js';


async function insertOwner (owner) {
  try {
    return OwnerModel.create(owner)
  } catch (error) {
    throw error;
  }
}

async function getOwners () {
  try {
    return await OwnerModel.findAll()
  } catch (error) {
    throw error;
  }
}

async function getOwnerById (id) {
  try {
    return await OwnerModel.findByPk(id)
  } catch (error) {
    throw error;
  }
}

async function updateOwner (owner) {
  try {
    await OwnerModel.update(
      {
        name: owner.name,
        phone: owner.phone
      }, 
      {
        where: { ownerId: owner.ownerId } 
      }
    )

    return getOwnerById(owner.ownerId);
  } catch (error) {
    throw error
  }
}

async function deleteOwner (id) {
  try {
    await OwnerModel.destroy({
      where: { ownerId: id }
    })

    return {
      'message': 'Deleted successfully',
    }
  } catch (error) {
    throw error;
  }
}


export default {
  insertOwner,
  getOwners,
  getOwnerById,
  updateOwner,
  deleteOwner
}