import connectToMongoDB from '../../../libs/mongodb';
import Contact from '../../../models/Contact';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method === 'POST') {
    try {
      const { name, lastName, email, phoneNumber, projectDetails, reasonsForContact } = req.body;

      if (!name || !lastName || !email || !phoneNumber || !projectDetails) {
        return res.status(400).json({ error: 'All required fields must be provided' });
      }

      const newContact = new Contact({
        name,
        lastName,
        email,
        phoneNumber,
        projectDetails,
        reasonsForContact: reasonsForContact || [],
      });

      await newContact.save();

      await sendEmails(newContact);

      res.status(201).json({
        message: 'Your message has been sent! A confirmation email has been sent to you.',
        contact: newContact,
      });
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (id) {
        const contact = await Contact.findById(id);
        if (!contact) {
          return res.status(404).json({ error: 'Contact not found' });
        }
        return res.status(200).json(contact);
      } else {
        const contacts = await Contact.find();
        return res.status(200).json(contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, name, lastName, email, phoneNumber, projectDetails, reasonsForContact } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Contact ID is required for updating' });
      }

      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {
          name,
          lastName,
          email,
          phoneNumber,
          projectDetails,
          reasonsForContact,
        },
        { new: true }
      );

      if (!updatedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.status(200).json(updatedContact);
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Contact ID is required for deletion' });
      }

      const deletedContact = await Contact.findByIdAndDelete(id);
      if (!deletedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Send email notifications to admin & user
const sendEmails = async (contact) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // **Admin Email Notification**
  const adminMailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.ADMIN_EMAIL, 
    subject: `New Contact Inquiry from ${contact.name} ${contact.lastName}`,
    html: `
      <p>A new contact inquiry has been received:</p>
      <p><strong>Name:</strong> ${contact.name} ${contact.lastName}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phoneNumber}</p>
      <p><strong>Project Details:</strong> ${contact.projectDetails}</p>
      <p><strong>Reasons for Contact:</strong> ${contact.reasonsForContact.join(', ') || 'N/A'}</p>
    `,
  };

  // **User Email Confirmation**
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: contact.email,
    subject: `Thank You for Contacting Us!`,
    html: `
      <p>Dear ${contact.name},</p>
      <p>Thank you for reaching out! We have received your message and will get back to you as soon as possible.</p>
      <p><b>Your Inquiry Details:</b></p>
      <p><strong>Project Details:</strong> ${contact.projectDetails}</p>
      <p><strong>Reasons for Contact:</strong> ${contact.reasonsForContact.join(', ') || 'N/A'}</p>
      <p>We appreciate your interest and look forward to assisting you.</p>
      <p>Best Regards,</p>
      <p><strong>Your Company Name</strong></p>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};
