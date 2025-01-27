import User from '@/models/User';
import jwt from 'jsonwebtoken';
import connectToMongoDB from '../../../libs/mongodb';

export default async function verifyEmail(req, res) {
    
    await connectToMongoDB();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token is required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email, token });
    if (!user || new Date() > user.tokenExpires) {
      return res.status(400).json({ error: 'Token is invalid or has expired.' });
    }

    user.isVerified = true;
    user.token = null;
    user.tokenExpires = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
