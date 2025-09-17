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

<<<<<<< HEAD
=======
      // Send email to user
>>>>>>> dfba80219a44927f86eecf3e13aec88c3c4d0adc
      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: booking.email,
        subject: "Booking Confirmation",
        text: `Hello ${booking.fullName},\n\nYour booking at ${apartment.name} is confirmed.\nCheck-in: ${booking.checkIn}\nCheck-out: ${booking.checkOut}\n\nThank you!`,
      });

<<<<<<< HEAD
=======
      // Send email to admin
>>>>>>> dfba80219a44927f86eecf3e13aec88c3c4d0adc
      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: process.env.ADMIN_EMAIL,
        subject: "New Booking Received",
        text: `New booking from ${booking.fullName} at ${apartment.name}.\nCheck-in: ${booking.checkIn}\nCheck-out: ${booking.checkOut}\nContact: ${booking.email}, ${booking.phone}`,
      });

      return res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ message: "Error creating booking", error });
    }
  }

<<<<<<< HEAD
=======
  // 📌 Get bookings
>>>>>>> dfba80219a44927f86eecf3e13aec88c3c4d0adc
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

<<<<<<< HEAD
=======
  // 📌 Delete booking
>>>>>>> dfba80219a44927f86eecf3e13aec88c3c4d0adc
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
