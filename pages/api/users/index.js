import connectToMongoDB from '../../../libs/mongodb';
import User from '../../../models/User';
import { authenticateUser } from '../../../middleware/auth';

export default async function handler(req, res) {
  await connectToMongoDB();

  const user = authenticateUser(req);
  if (!user || user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Access denied. Superadmin only.' });
  }

  if (req.method === 'GET') {
    try {
      const users = await User.find({ role: { $ne: 'superadmin' } }).select('-password');
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  } 
  
  else if (req.method === 'PUT') {
    try {
      const { id, isActive } = req.body;

      if (!id || typeof isActive !== "boolean") {
        return res.status(400).json({ error: 'User ID and a valid isActive (true/false) value are required' });
      }

      const userToUpdate = await User.findById(id);
      if (!userToUpdate) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (userToUpdate.role === 'superadmin') {
        return res.status(403).json({ error: 'Cannot modify a Superadmin' });
      }

      userToUpdate.isActive = isActive; // Assign the boolean value directly
      await userToUpdate.save();

      return res.status(200).json({ 
        message: `User has been ${isActive ? 'activated' : 'deactivated'}`, 
        user: userToUpdate 
      });

    } catch (error) {
      console.error('Error updating user status:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  } 
  
  else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
