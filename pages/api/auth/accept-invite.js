import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToMongoDB from '../../../libs/mongodb';

export default async function acceptInvite(req, res) {
  await connectToMongoDB();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Get token from URL query parameters instead of request body
  const { token } = req.query;
  const { password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and password are required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findOne({ email: decoded.email, token });
    if (!admin || new Date() > admin.tokenExpires) {
      return res.status(400).json({ error: 'Token is invalid or has expired.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    admin.password = hashedPassword;
    admin.token = null; 
    admin.tokenExpires = null;
    admin.isVerified = true;
    await admin.save();

    res.status(200).json({ message: 'Password set successfully. Admin account is active.' });
  } catch (error) {
    console.error('Error accepting invite:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
