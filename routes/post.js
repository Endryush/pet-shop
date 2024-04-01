import express from "express";
import PostController from "../controllers/post.js";

const router = express.Router()

router
  .get('/', PostController.getAllPosts)
  .post('/', PostController.insertPost)
  .post('/comment', PostController.insertComment)

export default router