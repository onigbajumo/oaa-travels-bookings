import connectToMongoDB from '../../../libs/mongodb';
import Staff from '../../../models/Staff';
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
      const { name, position, image } = req.body;

      if (!name || !position) {
        return res.status(400).json({ error: 'Name and position are required' });
      }

      let imageUrl = '';
      if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: 'ehizuahub/image',
        });
        imageUrl = uploadedImage.secure_url;
      }

      const newStaff = new Staff({
        name,
        position,
        image: imageUrl,
      });

      await newStaff.save();
      res.status(201).json(newStaff);
    } catch (error) {
      console.error('Error creating Staff:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    
    try {
      const { id } = req.query;

      if (id) {
        const Staff = await Staff.findById(id);
        if (!Staff) {
          return res.status(404).json({ error: 'Staff not found' });
        }
        return res.status(200).json(Staff);
      } else {
        const Staffs = await Staff.find(); 
        return res.status(200).json(Staffs);
      }
    } catch (error) {
      console.error('Error fetching Staffs:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    
    try {
      const { id, name, position, image } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Staff ID is required' });
      }

      let imageUrl;
      if (image) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: 'ehizuahub/image',
        });
        imageUrl = uploadedImage.secure_url;
      }

      const updatedStaff = await Staff.findByIdAndUpdate(
        id,
        {
          name,
          position,
          image: imageUrl || undefined, 
        },
        { new: true }
      );

      if (!updatedStaff) {
        return res.status(404).json({ error: 'Staff not found' });
      }

      res.status(200).json(updatedStaff);
    } catch (error) {
      console.error('Error updating Staff:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Staff ID is required' });
      }

      const deletedStaff = await Staff.findByIdAndDelete(id);
      if (!deletedStaff) {
        return res.status(404).json({ error: 'Staff not found' });
      }

      res.status(200).json({ position: 'Staff deleted successfully' });
    } catch (error) {
      console.error('Error deleting Staff:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {

    res.status(405).json({ error: 'Method not allowed' });
  }
}
