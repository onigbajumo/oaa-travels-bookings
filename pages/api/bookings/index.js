import connectToMongoDB from "../../../libs/mongodb";
import Booking from "../../../models/Booking";
import Apartment from "../../../models/Apartment";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method === "POST") {
    try {
      const body = req.body;

      const apartment = await Apartment.findById(body.apartmentId);
      if (!apartment) {
        return res.status(404).json({ message: "Apartment not found" });
      }

      const booking = await Booking.create({
        apartment: body.apartmentId,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: booking.email,
        subject: "Booking Confirmation",
        html: 
        `   
        <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Booking Confirmation - Oaa Travel</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <tr>
        <td style="background: #0077b6; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px;">Oaa Travel</h1>
          <p style="margin: 0;">Your trusted travel partner</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <h2 style="color: #333;">Booking Confirmed 🎉</h2>
          <p>Hello <strong>{{fullName}}</strong>,</p>
          <p>We’re excited to let you know that your booking at <strong>{{apartmentName}}</strong> has been confirmed.</p>
          
          <table width="100%" cellpadding="10" cellspacing="0" style="background: #f3f3f3; border-radius: 6px; margin: 20px 0;">
            <tr>
              <td><strong>Check-in:</strong></td>
              <td>{{checkIn}}</td>
            </tr>
            <tr>
              <td><strong>Check-out:</strong></td>
              <td>{{checkOut}}</td>
            </tr>
            <tr>
              <td><strong>Location:</strong></td>
              <td>{{apartmentLocation}}</td>
            </tr>
            <tr>
              <td><strong>Price:</strong></td>
              <td>₦{{pricePerNight}} / night</td>
            </tr>
          </table>

          <p>If you have any questions, feel free to reply to this email or contact our support team.</p>

          <p style="margin-top: 20px;">Safe travels,  
          <br><strong>The Oaa Travel Team</strong></p>
        </td>
      </tr>
      <tr>
        <td style="background: #0077b6; color: #ffffff; text-align: center; padding: 10px; font-size: 12px;">
          © 2025 Oaa Travel. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>

        `,
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: process.env.ADMIN_EMAIL,
        subject: "New Booking Received",
        html: `
        <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Booking - Oaa Travel</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <tr>
        <td style="background: #023e8a; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px;">Oaa Travel</h1>
          <p style="margin: 0;">Admin Booking Alert</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <h2 style="color: #333;">New Booking Received</h2>
          <p>A new booking has been made via Oaa Travel:</p>

          <table width="100%" cellpadding="10" cellspacing="0" style="background: #f3f3f3; border-radius: 6px; margin: 20px 0;">
            <tr>
              <td><strong>Customer:</strong></td>
              <td>{{fullName}}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{{email}}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td>{{phone}}</td>
            </tr>
            <tr>
              <td><strong>Apartment:</strong></td>
              <td>{{apartmentName}} (₦{{pricePerNight}}/night)</td>
            </tr>
            <tr>
              <td><strong>Check-in:</strong></td>
              <td>{{checkIn}}</td>
            </tr>
            <tr>
              <td><strong>Check-out:</strong></td>
              <td>{{checkOut}}</td>
            </tr>
          </table>

          <p>Please log in to the admin dashboard for full details and management.</p>
        </td>
      </tr>
      <tr>
        <td style="background: #023e8a; color: #ffffff; text-align: center; padding: 10px; font-size: 12px;">
          © 2025 Oaa Travel Admin Portal
        </td>
      </tr>
    </table>
  </body>
</html>

        `,
      });

      return res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ message: "Error creating booking", error });
    }
  }

  if (req.method === "GET") {
    try {
      const { id, start, end } = req.query;

      if (id) {
        const booking = await Booking.findById(id).populate("apartment");
        if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
        }
        return res.status(200).json(booking);
      }

      const query = {};
      if (start && end) {
        query.checkIn = { $lt: new Date(end) };
        query.checkOut = { $gt: new Date(start) };
      }

      const bookings = await Booking.find(query).populate("apartment");
      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ message: "Error fetching bookings", error });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "Booking ID required" });

      const booking = await Booking.findByIdAndDelete(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      return res.status(200).json({ message: "Booking deleted" });
    } catch (error) {
      console.error("Error deleting booking:", error);
      return res.status(500).json({ message: "Error deleting booking", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
