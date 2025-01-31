const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path to your model
const connectToMongoDB = require('./libs/mongodb'); 

const seedSuperAdmin = async () => {
  try {
    await connectToMongoDB();

    const existingSuperAdmin = await User.findOne({ role: 'superadmin' });
    if (existingSuperAdmin) {
      console.log('Superadmin already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash('qwertyuiop1', 10);

    const superAdmin = new User({
      name: 'SuperAdmin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'superadmin',
      isVerified: true,
    });

    await superAdmin.save();
    console.log('Superadmin seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding superadmin:', error);
    process.exit(1); 
  }
};

seedSuperAdmin();
