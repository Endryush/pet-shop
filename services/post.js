import PostRepository from '../repositories/post.js'

async function insertPost (post) {
  return await PostRepository.insertPost(post)
}

async function getPosts (id) {
  if (id) return await PostRepository.getPostById(id)

  return await PostRepository.getAllPosts()
}

async function insertComment (comment) {
  try {
    const selectedPost = await PostRepository.getPostById(comment.postId)

    selectedPost.comments.push({
      name: comment.name,
      content: comment.content
    })

    return await PostRepository.insertComment(selectedPost)
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  insertPost,
  getPosts,
  insertComment
}