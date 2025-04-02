import connectToMongoDB from '../../../libs/mongodb';
import Contestant from '../../../models/Contestant';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method === 'POST') {
    try {
      const {
        name, address, email, phone, socialMediaHandles, age, height, stateOfOrigin, dateOfBirth,
        placeOfBirth, cherishedProfession, bestThingAboutAge, descriptiveWords, embarrassingMoment,
        favoriteColor, dressSize, waistSize, shoeSize, bestAttribute, favoriteQuote, lifeAmbition,
        reasonForJoining, promotionPlan, schoolAchievements, activityInvolvements,
        leadershipRoles, workExperience, images, attestation
      } = req.body;

      
  if (!images) return res.status(400).json({ error: 'Please upload Image' });

      if (attestation !== true) {
        return res.status(400).json({ error: 'You must agree to the attestation terms.' });
      }

      const existing = await Contestant.findOne({ email });
      if (existing) {
        return res.status(409).json({ error: 'A contestant with this email already exists.' });
      }

      let uploadedImages = [];
      if (images && images.length > 0) {
        for (let img of images) {
          const uploaded = await cloudinary.uploader.upload(img, {
            folder: 'mbgmod/contestants',
          });
          uploadedImages.push(uploaded.secure_url);
        }
      }

      const contestant = new Contestant({
        name, address, email, phone, socialMediaHandles, age, height, stateOfOrigin, dateOfBirth,
        placeOfBirth, cherishedProfession, bestThingAboutAge, descriptiveWords, embarrassingMoment,
        favoriteColor, dressSize, waistSize, shoeSize, bestAttribute, favoriteQuote, lifeAmbition,
        reasonForJoining, promotionPlan, schoolAchievements, activityInvolvements,
        leadershipRoles, workExperience, images: uploadedImages, attestation
      });

      await contestant.save();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `MBGMOD International <${process.env.EMAIL_USERNAME}>`,
        to: contestant.email,
        subject: 'Registration Successful - MBGMOD International',
        html: `
          <h3>Hello ${contestant.name},</h3>
          <p>Thank you for registering for the MBGMOD International pageant. We have received your submission.</p>
          <p>Our team will review your application and get back to you if necessary.</p>
          <p><strong>Regards,</strong><br/>MBGMOD International Team</p>
        `,
      });

      await transporter.sendMail({
        from: `MBGMOD System <${process.env.EMAIL_USERNAME}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Contestant Registration Received',
        html: `
          <h3>New Contestant Registered</h3>
          <p><strong>Name:</strong> ${contestant.name}</p>
          <p><strong>Email:</strong> ${contestant.email}</p>
          <p><strong>Phone:</strong> ${contestant.phone}</p>
          <p><strong>State of Origin:</strong> ${contestant.stateOfOrigin}</p>
          <p><strong>Reason for Joining:</strong> ${contestant.reasonForJoining}</p>
          <br/>
          <p>Check the admin dashboard for full details.</p>
        `,
      });

      res.status(201).json(contestant);
    } catch (error) {
      console.error('Error creating contestant:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { id, start, end } = req.query;

      if (id) {
        const contestant = await Contestant.findById(id);
        if (!contestant) return res.status(404).json({ error: 'Contestant not found' });
        return res.status(200).json(contestant);
      }

      let query = {};
      if (start && end) {
        query.createdAt = {
          $gte: new Date(start),
          $lte: new Date(end),
        };
      }

      const contestants = await Contestant.find(query).sort({ createdAt: -1 });
      return res.status(200).json(contestants);
    } catch (error) {
      console.error('Error fetching contestants:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body;
      if (!id) return res.status(400).json({ error: 'Contestant ID is required' });

      let uploadedImages = [];
      if (updateData.images && updateData.images.length > 0) {
        for (let img of updateData.images) {
          const uploaded = await cloudinary.uploader.upload(img, {
            folder: 'mbgmod/contestants',
          });
          uploadedImages.push(uploaded.secure_url);
        }
        updateData.images = uploadedImages;
      }

      const updatedContestant = await Contestant.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedContestant) return res.status(404).json({ error: 'Contestant not found' });

      res.status(200).json(updatedContestant);
    } catch (error) {
      console.error('Error updating contestant:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id, ids } = req.query;

      if (ids) {
        const idArray = ids.split(',');
        await Contestant.deleteMany({ _id: { $in: idArray } });
        return res.status(200).json({ message: 'Selected contestants deleted' });
      }

      if (!id) return res.status(400).json({ error: 'Contestant ID is required' });

      const deletedContestant = await Contestant.findByIdAndDelete(id);
      if (!deletedContestant) return res.status(404).json({ error: 'Contestant not found' });

      res.status(200).json({ message: 'Contestant deleted successfully' });
    } catch (error) {
      console.error('Error deleting contestant:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb', 
    },
  },
};

