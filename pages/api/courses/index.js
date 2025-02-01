import connectToMongoDB from '../../../libs/mongodb';
import Course from '../../../models/Course';
import { v2 as cloudinary } from 'cloudinary';
import slugify from 'slugify';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate a unique slug from title
const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true, strict: true });
  let existingCourse = await Course.findOne({ slug });

  if (!existingCourse) return slug; // Slug is unique

  let count = 1;
  let newSlug = `${slug}-${count}`;

  while (await Course.findOne({ slug: newSlug })) {
    count++;
    newSlug = `${slug}-${count}`;
  }

  return newSlug;
};

export default async function handler(req, res) {
  await connectToMongoDB(); 
  if (req.method === 'POST') {

    try {
      let { title, rating, category, description, duration, tag, mode, image, highlights, skills, instructor, curriculum, payments } = req.body;

      if (!title || !rating || !category || !description || !duration || !tag || !mode || !highlights || !skills || !instructor || !curriculum || !payments) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const slug = await generateUniqueSlug(title);

      let imageUrl = '';
      if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: 'ehizuahub/courses',
        });
        imageUrl = uploadedImage.secure_url;
      }

      const newCourse = new Course({
        title,
        rating,
        slug,
        category,
        description,
        duration,
        tag,
        mode,
        image: imageUrl,
        highlights,
        skills,
        instructor,
        curriculum,
        payments,
      });

      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {

    try {
      const { slug } = req.query;

      if (slug) {
        const course = await Course.findOne({ slug });
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
        return res.status(200).json(course);
      } else {
        const courses = await Course.find();
        return res.status(200).json(courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {

    try {
      const { id, title, image, ...updates } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Course ID is required' });
      }

      if (title) {
        updates.slug = await generateUniqueSlug(title);
      }

      if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: 'ehizuahub/courses',
        });
        updates.image = uploadedImage.secure_url;
      }

      const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json(updatedCourse);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Course ID is required' });
      }

      const deletedCourse = await Course.findByIdAndDelete(id);
      if (!deletedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    
    res.status(405).json({ error: 'Method not allowed' });
  }
}
