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
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const userToDeactivate = await User.findById(id);
      if (!userToDeactivate) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (userToDeactivate.role === 'superadmin') {
        return res.status(403).json({ error: 'Cannot deactivate a Superadmin' });
      }

      userToDeactivate.isActive = false;
      await userToDeactivate.save();

      res.status(200).json({ message: 'User has been deactivated' });
    } catch (error) {
      console.error('Error deactivating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
