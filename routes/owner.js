import express from "express";
import ownerController from "../controllers/owner.js";

const router = express.Router()

router
  .get('/', ownerController.getOwners)
  .get('/:id', ownerController.getOwnerById)
  .post('/', ownerController.insertOwner)
  .put( '/', ownerController.updateOwner)
  .delete('/:id', ownerController.deleteOwner)


export default router