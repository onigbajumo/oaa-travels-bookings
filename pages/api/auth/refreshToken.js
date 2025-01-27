import jwt from 'jsonwebtoken';
import RefreshToken from '../../../models/RefreshToken';
import User from '../../../models/User';
import { generateTokens } from '../../../utils/auth';
import connectToMongoDB from '../../../libs/mongodb';

export default async function refresh(req, res) {

    await connectToMongoDB();
    
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token is required' });

  try {
    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenDoc || new Date() > tokenDoc.expiresAt) {
      return res.status(400).json({ error: 'Invalid or expired refresh token' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ error: 'Invalid refresh token' });

    const tokens = await generateTokens(user);

    await RefreshToken.findByIdAndDelete(tokenDoc._id);

    res.status(200).json(tokens);
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
