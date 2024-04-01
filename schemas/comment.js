import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
  }, { collection: 'posts' }  
)

export default CommentSchema