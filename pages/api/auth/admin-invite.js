import User from '../../../models/User';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import connectToMongoDB from '../../../libs/mongodb';

export default async function inviteAdmin(req, res) {
  await connectToMongoDB();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (!existingUser.isVerified && new Date() > existingUser.tokenExpires) {
        // Remove the expired user record
        await User.findByIdAndDelete(existingUser._id);
      } else {
        return res.status(400).json({ error: 'User already exists or pending verification.' });
      }
    }

    const token = jwt.sign({ email, role: 'admin', name }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const admin = new User({
      name,
      email,
      role: 'admin',
      token,
      tokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
    });
    await admin.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'; 
    const host = req.headers.host; 
    const inviteLink = `${protocol}://${host}/accept-invite?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Invitation',
      html: `
        <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Invitation - Ehizua Hub</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
          }
          header img {
            width: 100%;
          }
          h1 {
            font-size: 24px;
            color: #134574;
          }
          h3 {
            font-size: 22px;
            font-weight: bold;
            color: #134574;
            margin-bottom: 10px;
          }
          p {
            font-size: 16px;
            color: #555;
          }
          .btn {
            display: inline-block;
            background-color: #134574;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 999px;
            font-size: 16px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
          }
          .footer a {
            margin: 0 10px;
            text-decoration: none;
          }
          .footer img {
            width: 35px;
            height: 35px;
            vertical-align: middle;
          }
          .footer small {
            display: block;
            font-size: 12px;
            color: #777;
            margin-top: 10px;
          }
          .footer p {
            font-size: 14px;
            color: #777;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <img src="https://www.ehizuahub.com/banner.png" alt="Ehizua Hub Banner" />
          </header>

          <section class="confirmation">
            <h3>Welcome to Ehizua Hub – Let’s Get Started!</h3>
            <h1>Hi ${name},</h1>
            <p>
              You've been invited to join <strong>Ehizua Hub</strong> as an admin! 🎉
            </p>
            <p>
              Click the button below to accept your invitation and set up your account.
            </p>

            <div class="btn-cover" style="text-align: center;">
              <a href="${inviteLink}" class="btn">Accept Invitation</a>
            </div>

            <p>This invitation link will expire in <strong>24 hours</strong>. If you didn’t request this, please ignore this email.</p>
            <p>Best Regards,</p>
            <h4>The Ehizua Hub Team</h4>
          </section>

          <footer class="footer">
            <hr />
            <div>
              <a href="https://www.instagram.com/ehizuahub">
                <img src="https://www.ehizuahub.com/instagram.svg" alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/ehizuahub">
                <img src="https://www.ehizuahub.com/facebook.svg" alt="Facebook" />
              </a>
            </div>
            <hr />
            <small>&copy; 2025 Ehizua Hub. All rights reserved.</small>
          </footer>
        </div>
      </body>
      </html>
      `,
    });

    res.status(200).json({ message: 'Invitation sent successfully.' });
  } catch (error) {
    console.error('Error inviting admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
