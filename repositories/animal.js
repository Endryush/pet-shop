import { connect } from "./db.js"


async function insertAnimal (animal) {
  const db = await connect()
  try {
    const sql = 'INSERT INTO animals (name, type, owner_id) VALUES ($1, $2, $3) RETURNING *'
    const values = [animal.name, animal.type, animal.owner_id]
    const response = await db.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    db.release()
  }
}

async function getAnimals () {
  const db = await connect()
  try {
    const response = await db.query('SELECT * FROM animals')
  
    return response?.rows
  } catch (error) {
    throw error;
  } finally {
    db.release()
  }
}

async function getAnimalById (id) {
  const db = await connect()
  try {
    const response = await db.query('SELECT * FROM animals WHERE animal_id=$1', [id])
  
    return response?.rows?.[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

async function updateAnimal (animal) {
  const db = await connect()
  try {
    const sql = 'UPDATE animals SET name = $1, type = $2, owner_id = $3 WHERE animal_id = $4 RETURNING *'
    const values = [animal.name, animal.type, animal.owner_id, animal.animal_id]
    const response = await db.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

async function deleteAnimal (id) {
  const db = await connect()
  try {
    await db.query('DELETE FROM animals WHERE animal_id = $1 RETURNING *', [id])
  
    return {
      'message': 'Deleted successfully',
    }
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

async function getAnimalByOwner (id) {
  const db = await connect()
  try {
    const response = await db.query('SELECT * FROM animals WHERE owner_id = $1', [id])

    return response?.rows
  } catch (error) {
    throw error
  } finally {
    db.release()
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