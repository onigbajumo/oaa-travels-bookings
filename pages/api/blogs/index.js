import connectToMongoDB from '../../../libs/mongodb';
import Blog from '../../../models/Blog';
import Category from '../../../models/Category';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary';
import { authenticateUser } from '../../../middleware/auth';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true, strict: true });
  let existingBlog = await Blog.findOne({ slug });

  if (!existingBlog) return slug;

  let count = 1;
  let newSlug = `${slug}-${count}`;

  while (await Blog.findOne({ slug: newSlug })) {
    count++;
    newSlug = `${slug}-${count}`;
  }

  return newSlug;
};

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method === 'POST') {
    try {
      
      const user = authenticateUser(req);
      if (!user || !user.name) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
      }

      let { title, body, image, category, isFeatured } = req.body;

      if (!title || !body || !category) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ error: 'Category not found' });
      }

     
      const slug = await generateUniqueSlug(title);

      
      let imageUrl = '';
      if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: 'ehizuahub/blogs',
        });
        imageUrl = uploadedImage.secure_url;
      }

      
      if (isFeatured) {
        await Blog.updateMany({}, { isFeatured: false });
      }

      const newBlog = new Blog({
        title,
        body,
        image: imageUrl,
        category,
        slug,
        author: user.name, 
        isFeatured,
      });

      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { slug } = req.query;

      if (slug) {
        const blog = await Blog.findOne({ slug }).populate('category');
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        return res.status(200).json(blog);
      } else {
        const blogs = await Blog.find().populate('category');
        return res.status(200).json(blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } 
  else if (req.method === 'PUT') {
    try {
      const { id, title, body, image, category, isFeatured } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
      }

      let updates = { title, body, category };

      if (title) {
        updates.slug = await generateUniqueSlug(title);
        updates.title = title; 
      }

      if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: 'ehizuahub/blogs',
        });
        updates.image = uploadedImage.secure_url;
      }

      if (isFeatured) {
        await Blog.updateMany({}, { isFeatured: false });
      }

      const updatedBlog = await Blog.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
      }

      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
