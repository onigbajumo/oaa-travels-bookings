import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectToMongoDB from '../../../libs/mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      await connectToMongoDB();
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password successfully updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Invalid or expired token' });
  }
}
