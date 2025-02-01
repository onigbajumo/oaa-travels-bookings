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
    html: `<p>A new student has enrolled in <b>${course.title}</b>.</p>
           <p><strong>Name:</strong> ${enrollment.firstName} ${enrollment.lastName}</p>
           <p><strong>Email:</strong> ${enrollment.email}</p>
           <p><strong>Phone:</strong> ${enrollment.phoneNumber}</p>
           <p><strong>Mode:</strong> ${enrollment.learningMode}</p>
           <p><strong>Payment Plan:</strong> ${enrollment.paymentPlan}</p>
           <p><strong>Gender:</strong> ${enrollment.gender}</p>
           <p><strong>State:</strong> ${enrollment.state}</p>`,
  };

  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: enrollment.email,
    subject: `Enrollment Confirmation: ${course.title}`,
    html: `<p>Dear ${enrollment.firstName},</p>
           <p>Thank you for enrolling in <b>${course.title}</b>.</p>
           <p>Your enrollment has been successfully received.</p>
           <p><b>Mode:</b> ${enrollment.learningMode}</p>
           <p><b>Payment Plan:</b> ${enrollment.paymentPlan}</p>
           <p>We will contact you soon with further details.</p>`,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};
