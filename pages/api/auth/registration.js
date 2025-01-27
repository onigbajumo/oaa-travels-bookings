import User from '../../../models/User';
import connectToMongoDB from '../../../libs/mongodb';
import nodemailer from 'nodemailer'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function register(req, res) {
  
  await connectToMongoDB();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, phoneNumber, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'All fields are required' });

  try {
    
        const existingUser = await User.findOne({
          $or: [{ email }, { phoneNumber }],
        });
    
        if (existingUser) {
          return res.status(400).json({
            error: 'A user with this email or phone number already exists.',
          });
        }
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const user = new User({
      email,
      phoneNumber,
      password: hashedPassword,
      role: 'student',
      token,
      tokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
    });
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email. This link will expire in 24 hours.</p>`,
    });

    res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

