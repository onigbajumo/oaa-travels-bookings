import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    tag: { type: String, required: true },
    mode: { type: [String], required: true },
    image: { type: String, required: true },
    highlights: { type: [String], required: true },
    skills: { type: [String], required: true },
    instructor: {
      name: { type: String, },
      image: { type: String, },
      bio: { type: String, },
      experience: { type: String, },
    },
    curriculum: [
      {
        module: { type: String, required: true },
        topics: { type: [String], required: true },
      },
    ],
    payments: [
      {
        mode: { type: String, required: true },
        plan: { type: String, required: true },
        price: { type: String, required: true },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

export default Course;
