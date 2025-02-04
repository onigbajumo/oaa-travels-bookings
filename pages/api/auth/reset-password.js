import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectToMongoDB from '../../../libs/mongodb';

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get token from query params
  const { token } = req.query;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    console.log('Password reset failed: Missing token or password.');
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('Password reset failed: User not found.');
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    // Log successful reset
    console.log(`Password reset successful for user: ${user.email} (ID: ${user._id})`);

    res.status(200).json({
      message: 'Password successfully updated',
      user: {
        id: user._id,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
}
