import mongoose from "mongoose";
import CommentSchema from './comment.js'

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    comments: [CommentSchema]
  }, { collection: 'posts' }  
)

export default PostSchema