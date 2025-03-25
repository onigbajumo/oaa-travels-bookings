import connectToMongoDB from '../../../libs/mongodb';
import Contact from '../../../models/Contact';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method === 'POST') {
    try {
      const { name, email, phone, message} = req.body;

      if (!name || !lastName || !email || !phone || !message) {
        return res.status(400).json({ error: 'All required fields must be provided' });
      }

      const newContact = new Contact({
        name,
        email,
        phone,
        message,
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
      const { id, name,  email, phone, message} = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Contact ID is required for updating' });
      }

      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {
          name,
          email,
          phone,
          message
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

const sendEmails = async (contact) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const adminMailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.ADMIN_EMAIL, 
    subject: `New Contact Inquiry from ${contact.name}`,
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
         
      <p>A new contact inquiry has been received:</p>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone}</p>
      <p><strong>Project Details:</strong> ${contact.message}</p>
      

        <h4>The Eighty Degrees Team</h4>
      </section>

      <footer class="footer">
        <hr />
        <div>
          <a href="https://www.instagram.com/" target="_blank">
            <img src="https://www.ehizuahub.com/instagram.svg" alt="instagram" />
          </a>
          <a href="https://www.facebook.com/" target="_blank">
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
    to: contact.email,
    subject: `Thank You for Contacting Us!`,
    html: `
      <p>Dear ${contact.name},</p>
      <p>Thank you for reaching out! We have received your message and will get back to you as soon as possible.</p>
      <p><b>Your Inquiry Details:</b></p>
      <p><strong>Message:</strong> ${contact.message}</p>
      <p>We will get back to you shortly.</p>
      <p>Best Regards,</p>
      <p><strong>Your Company Name</strong></p>

      
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
        <p>Dear ${contact.name},</p>
      <p>Thank you for reaching out! We have received your message and will get back to you as soon as possible.</p>
      
           <p><b>Your Inquiry Details:</b></p>
      <p><strong>Project Details:</strong> ${contact.projectDetails}</p>
      <p><strong>Reasons for Contact:</strong> ${contact.reasonsForContact.join(', ') || 'N/A'}</p>
      <p>We appreciate your interest and look forward to assisting you.</p>

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
