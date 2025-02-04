import jwt from 'jsonwebtoken';
import RefreshToken from '../models/RefreshToken';

export const generateTokens = async (user) => {
  const roleExpirations = {
    superadmin: '3d',
    admin: '7d',
    student: '30d',
  };

  const accessToken = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: roleExpirations[user.role] }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_SECRET,
    { expiresIn: '30d' }
  );

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 
  await RefreshToken.create({
    userId: user.id,
    token: refreshToken,
    expiresAt,
  });

  return { accessToken, refreshToken };
};
