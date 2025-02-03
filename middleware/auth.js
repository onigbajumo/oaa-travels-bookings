import jwt from 'jsonwebtoken';

export const authenticateUser = (req) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return null;
    }

    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};
