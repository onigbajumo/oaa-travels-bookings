import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  message: {
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

const Testimonials = mongoose.models.Testimonials || mongoose.model('Testimonials', TestimonialSchema);

export default Testimonials;
