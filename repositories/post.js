import { connect } from "./mongo.db.js"
import PostSchema from "../schemas/post.js"

async function insertPost (post) {
  try {
    const mongoose = await connect()

    const Post = mongoose.model('Post', PostSchema);
    const newPost = new Post(post)
    return await newPost.save(newPost)
  } catch (error) {
    throw error
  }
}

async function getAllPosts () {
  try {
    const mongoose = await connect()
    const Post = mongoose.model('Post', PostSchema)

    return await Post.find().exec()
  } catch (error) {
    throw error
  }
}

async function getPostById (id) {
  try {
    const mongoose = await connect()
    const Post = mongoose.model('Post', PostSchema)

    return await Post.findOne({ _id: id }).exec()
  } catch (error) {
    throw error
  }
}

async function insertComment (post) {
  try {
    const mongoose = await connect()
    const PostInfo = mongoose.model('PostInfo', PostSchema)

    return await PostInfo.findOneAndUpdate({ _id: post._id }, post)
  } catch (error) {
    throw error
  }
}

export default {
  insertPost,
  getAllPosts,
  getPostById,
  insertComment
}