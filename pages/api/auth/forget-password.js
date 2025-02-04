import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectToMongoDB from '../../../libs/mongodb';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await connectToMongoDB();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } 
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
      
      
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
      }

      header img {
        width: 100%;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 8px;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      h1 {
        font-size: 28px;
        font-weight: bold;
        color: #000000;
        margin-top: 20px;
        margin-bottom: 10px;
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
        margin: 10px 0;
      }

      .btn {
        display: inline-block;
        background-color: #134574;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 50px;
        border-radius: 999px;
        font-size: 16px;
        margin: 20px 0;
      }

      .btn-cover {
        text-align: center;
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
        <img
          src="https://www.ehizuahub.com/banner.png"
          alt="Ehizua Hub Banner"
          class="banner"
        />
      </header>

      <section class="confirmation">
        <h3>Reset Your Ehizua Hub Password</h3>
        <h1>Hi,</h1>
        <p>
          We received a request to reset your Ehizua Hub password. If you made this request, click the button below to set a new password
        </p>

        <div class="btn-cover">
          <a href="${resetLink}" class="btn">Reset My Password</a>
        </div>

        <p>If you didn’t request a password reset, please ignore this email.
          This link will expire in 30 minutes for security reasons.</p>
        <p>Best Regards,</p>
        <h4>The Ehizua Hub Team</h4>
      </section>

      <footer class="footer">
        <hr />
        <div>
          <a href="https://www.instagram.com/ehizuahub">
            <img src="https://www.ehizuahub.com/instagram.svg" alt="instagram" />
          </a>
          <a href="https://www.facebook.com/ehizuahub">
            <img src="https://www.ehizuahub.com/facbook.svg" alt="Facebook" />
          </a>
        </div>
        <hr />
        <small>&copy;  2025 Ehizua-Hub . All rights reserved.</small>
        <p>
          You are receiving this email because you registered to join the
          Ehizua-Hub platform. This also shows that you agree to our Terms of Use
          and Privacy Policies. If you no longer want to receive emails from us,
          <a href="https://www.ehizuahub.com/" style="color: #134574; text-decoration: underline">
            click here to unsubscribe
          </a>.
        </p>
      </footer>
    </div>
  </body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
