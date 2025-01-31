import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  projectDetails: {
    type: String,
    required: true,
  },
  reasonsForContact: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;
