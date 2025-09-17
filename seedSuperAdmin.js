const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const connectToMongoDB = require('../libs/mongodb'); 

const seedSuperAdmin = async () => {
  try {
    await connectToMongoDB();

    const existingSuperAdmin = await User.find({ role: 'superadmin' });
    if (existingSuperAdmin) {
      console.log('Superadmin already exists.');
      return;
    }
    const hashedPassword = await bcrypt.hash('qwertyuiop', 10);

    const superAdmin = new User({
      name: 'SuperAdmin',
      email: 'onigbajumogbenga@gmail.com',
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
