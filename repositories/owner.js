import { connect } from "./db.js"


async function insertOwner (owner) {
  const db = await connect()
  try {
    const sql = 'INSERT INTO owners (name, phone) VALUES ($1, $2) RETURNING *'
    const values = [owner.name, owner.phone]
    const response = await db.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    db.release()
  }
}

async function getOwners () {
  const db = await connect()
  try {
    const response = await db.query('SELECT * FROM owners')
  
    return response?.rows
  } catch (error) {
    throw error;
  } finally {
    db.release()
  }
}

async function getOwnerById (id) {
  const db = await connect()
  try {
    const response = await db.query('SELECT * FROM owners WHERE owner_id=$1', [id])
  
    return response?.rows?.[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

async function updateOwner (owner) {
  const db = await connect()
  try {
    const sql = 'UPDATE owners SET name = $1, phone = $2 WHERE owner_id = $3 RETURNING *'
    const values = [owner.name, owner.phone, owner.owner_id]
    const response = await db.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}

async function deleteOwner (id) {
  const db = await connect()
  try {
    await db.query('DELETE FROM owners WHERE owner_id = $1 RETURNING *', [id])
  
    return {
      'message': 'Deleted successfully',
    }
  } catch (error) {
    throw error
  } finally {
    db.release()
  }
}


export default {
  insertOwner,
  getOwners,
  getOwnerById,
  updateOwner,
  deleteOwner
}