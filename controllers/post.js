import PostService from '../services/post.js'

async function insertPost (req, res, next) {
  try {
    const post = req.body

    if (!post.title || !post.content) throw new Error('Title and Content are required')

    res.status(201).send(await PostService.insertPost(post))
    logger.info('POST /post', post)
  } catch (error) {
    next(error)
  }
}

async function getAllPosts (req, res, next) {
  try {
    const { id } = req.query
    res.status(200).send(await PostService.getPosts(id))
  } catch (error) {
    next(error)
  }
}

async function insertComment (req, res, next) {
  try {
    const comment = req.body

    if (!comment.postId || !comment.content || !comment.name) throw new Error('all fields are required') 

    res.status(200).send(await PostService.insertComment(comment))
    logger.info('POST /post/comment', comment)
  } catch (error) {
    next(error)
  }
}

export default {
  insertPost,
  getAllPosts,
  insertComment
}