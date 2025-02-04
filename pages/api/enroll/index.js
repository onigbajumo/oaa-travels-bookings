import connectToMongoDB from '../../../libs/mongodb';
import Enrollment from '../../../models/Enrollment';
import Course from '../../../models/Course';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  await connectToMongoDB(); 

  if (req.method === 'POST') {

    try {
      const {
        courseSlug,
        firstName,
        lastName,
        phoneNumber,
        email,
        gender,
        state,
        learningMode,
        paymentPlan,
        terms,
      } = req.body;

      if (
        !courseSlug ||
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !email ||
        !gender ||
        !state ||
        !learningMode ||
        !paymentPlan ||
        !terms
      ) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const course = await Course.findOne({ slug: courseSlug });
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const newEnrollment = new Enrollment({
        courseSlug,
        firstName,
        lastName,
        phoneNumber,
        email,
        gender,
        state,
        learningMode,
        paymentPlan,
        terms,
      });

      await newEnrollment.save();

      await sendEmails(newEnrollment, course);

      res.status(201).json({
        message: 'Enrollment successful! A confirmation email has been sent.',
        enrollment: newEnrollment,
      });
    } catch (error) {
      console.error('Error enrolling in course:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { id, courseSlug } = req.query;

      if (id) {
        const enrollment = await Enrollment.findById(id);
        if (!enrollment) {
          return res.status(404).json({ error: 'Enrollment not found' });
        }

        const course = await Course.findOne({ slug: enrollment.courseSlug });
        return res.status(200).json({ ...enrollment.toObject(), course });
      } else if (courseSlug) {
        const course = await Course.findOne({ slug: courseSlug });

        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }

        return res.status(200).json({
          title: course.title,
          duration: course.duration,
          tag: course.tag,
          learningModes: course.mode,
          payments: course.payments,
          instructor: {
            name: course.instructor.name,
            experience: course.instructor.experience,
          },
        });
      } else {
        const enrollments = await Enrollment.find();
        return res.status(200).json(enrollments);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

const sendEmails = async (enrollment, course) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Enrollment: ${enrollment.firstName} ${enrollment.lastName}`,
    html: ` 
          
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email</title>
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
         <h1>New Enrollment Notification</h1>
          <p>A new student has enrolled in <b>${course.title}</b>.</p>
          <p>A new student has enrolled in <b>${course.title}</b>.</p>
           <p><strong>Name:</strong> ${enrollment.firstName} ${enrollment.lastName}</p>
           <p><strong>Email:</strong> ${enrollment.email}</p>
           <p><strong>Phone:</strong> ${enrollment.phoneNumber}</p>
           <p><strong>Mode:</strong> ${enrollment.learningMode}</p>
           <p><strong>Payment Plan:</strong> ${enrollment.paymentPlan}</p>
           <p><strong>Gender:</strong> ${enrollment.gender}</p>
           <p><strong>State:</strong> ${enrollment.state}</p>

        <h4>The Ehizua Hub Team</h4>
      </section>

      <footer class="footer">
        <hr />
        <div>
          <a href="https://www.instagram.com/ehizuahub" target="_blank">
            <img src="https://www.ehizuahub.com/instagram.svg" alt="instagram" />
          </a>
          <a href="https://www.facebook.com/ehizuahub" target="_blank">
            <img src="https://www.ehizuahub.com/facbook.svg" alt="Facebook" />
          </a>
        </div>
        <hr />
        <small>&copy;  2025 Ehizua-Hub . All rights reserved.</small>
      
      </footer>
    </div>
  </body>
</html>

`,
  };

  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: enrollment.email,
    subject: `Enrollment Confirmation: ${course.title}`,
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email</title>
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
            <h3>Welcome to Ehizua Hub – Let’s Get Started!</h3>
        <h1>Dear ${enrollment.firstName},</h1>
        
            <p>Thank you for enrolling in <b>${course.title}</b>. 🎉</p>
            <p>Your enrollment has been successfully received. Below are your details:</p>
	          <p><b>Mode:</b> ${enrollment.learningMode}</p>
            <p><b>Payment Plan:</b> ${enrollment.paymentPlan}</p>

      <p>Our team will reach out to you soon with further information.</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>

        <p>If you didn’t request this, please ignore this email.</p>
        <p>Best Regards,</p>
        <h4>The Ehizua Hub Team</h4>
      </section>

      <footer class="footer">
        <hr />
        <div>
          <a href="https://www.instagram.com/ehizuahub" target="_blank">
            <img src="https://www.ehizuahub.com/instagram.svg" alt="instagram" />
          </a>
          <a href="https://www.facebook.com/ehizuahub" target="_blank">
            <img src="https://www.ehizuahub.com/facbook.svg" alt="Facebook" />
          </a>
        </div>
        <hr />
        <small>&copy;  2025 Ehizua-Hub . All rights reserved.</small>
        <p>
          You are receiving this email because you registered to join the
          Ehizua-Hub platform. This also shows that you agree to our Terms of Use
          and Privacy Policies.
        </p>
      </footer>
    </div>
  </body>
</html>
           
           
           `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};
