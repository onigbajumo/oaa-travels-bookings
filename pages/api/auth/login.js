import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import connectToMongoDB from '../../../libs/mongodb';
import { generateTokens } from '../../../utils/auth';
import RefreshToken from '../../../models/RefreshToken';

export default async function login(req, res) {
  await connectToMongoDB();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { emailOrPhone, password } = req.body;
  if (!emailOrPhone || !password) {
    return res.status(400).json({ error: 'Email/Phone and password are required' });
  }

  try {

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    if (!user.isVerified) return res.status(400).json({ error: 'Please verify your email first' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const tokens = await generateTokens(user);

    res.status(200).json(tokens);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// export default async function logout(req, res) {
//   const { refreshToken } = req.body;
//   if (!refreshToken) return res.status(400).json({ error: 'Refresh token is required' });

//   try {
//     await RefreshToken.deleteOne({ token: refreshToken });
//     res.status(200).json({ message: 'Logged out successfully.' });
//   } catch (error) {
//     console.error('Error logging out:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

