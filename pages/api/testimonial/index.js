import connectToMongoDB from '../../../libs/mongodb';
import Testimonial from '../../../models/Testimonial';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  await connectToMongoDB(); 

  if (req.method === 'POST') {
   
    try {
      const { name, message, image } = req.body;

      if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
      }

      let imageUrl = '';
      if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: 'ehizuahub/image',
        });
        imageUrl = uploadedImage.secure_url;
      }

      const newTestimonial = new Testimonial({
        name,
        message,
        image: imageUrl,
      });

      await newTestimonial.save();
      res.status(201).json(newTestimonial);
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    
    try {
      const { id } = req.query;

      if (id) {
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }
        return res.status(200).json(testimonial);
      } else {
        const testimonials = await Testimonial.find(); 
        return res.status(200).json(testimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    
    try {
      const { id, name, message, image } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Testimonial ID is required' });
      }

      let imageUrl;
      if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: 'ehizuahub/image',
        });
        imageUrl = uploadedImage.secure_url;
      }

      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        id,
        {
          name,
          message,
          image: imageUrl || undefined, 
        },
        { new: true }
      );

      if (!updatedTestimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }

      res.status(200).json(updatedTestimonial);
    } catch (error) {
      console.error('Error updating testimonial:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Testimonial ID is required' });
      }

      const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
      if (!deletedTestimonial) {
        return res.status(404).json({ error: 'Testimonial not found' });
      }

      res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    // Method not allowed
    res.status(405).json({ error: 'Method not allowed' });
  }
}
