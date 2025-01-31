import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema(
  {
    courseSlug: { type: String, required: true }, 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    gender: { type: String, required: true },
    state: { type: String, required: true },
    learningMode: { type: String, required: true },
    paymentPlan: { type: String, required: true },
    terms: { type: Boolean, required: true },
    status: { type: String, default: 'pending' }, // pending, confirmed, rejected
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Enrollment =
  mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);

export default Enrollment;
