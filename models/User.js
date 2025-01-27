import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: function () {
        return this.role === 'student';
      },
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'superadmin'],
      default: 'student',
    },
    token: {
      type: String, 
    },
    tokenExpires: {
      type: Date, 
    },
    isVerified: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
