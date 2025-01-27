import User from '../../../models/User';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import connectToMongoDB from '../../../libs/mongodb';

export default async function inviteAdmin(req, res) {
  await connectToMongoDB();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (!existingUser.isVerified && new Date() > existingUser.tokenExpires) {
        // Remove the expired user record
        await User.findByIdAndDelete(existingUser._id);
      } else {
        return res.status(400).json({ error: 'User already exists or pending verification.' });
      }
    }

    const token = jwt.sign({ email, role: 'admin', name }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const admin = new User({
      name,
      email,
      role: 'admin',
      token,
      tokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
    });
    await admin.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'; 
    const host = req.headers.host; 
    const inviteLink = `${protocol}://${host}/accept-invite?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Invitation',
      html: `<p>Hello ${name},</p><p>You have been invited to join as an admin. Please click <a href="${inviteLink}">here</a> to accept the invite. This link will expire in 24 hours.</p>`,
    });

    res.status(200).json({ message: 'Invitation sent successfully.' });
  } catch (error) {
    console.error('Error inviting admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
