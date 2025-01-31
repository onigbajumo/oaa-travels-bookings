import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FAQs = mongoose.models.FAQs || mongoose.model('FAQs', FaqSchema);

export default FAQs;
