
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    console.log("MONGODB_URI:", process.env.MONGODB_URI);


    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};
module.exports = connectToMongoDB; 
