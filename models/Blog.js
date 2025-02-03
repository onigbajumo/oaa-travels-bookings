import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;
