import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: 'https://img.freepik.com/premium-psd/premium-bakery-social-media-post-template_574412-534.jpg'
  },
  category: {
    type: String,
    default: 'uncategorized'
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;