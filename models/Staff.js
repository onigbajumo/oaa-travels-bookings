import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);

export default Staff;
