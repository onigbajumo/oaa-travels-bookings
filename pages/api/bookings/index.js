import connectToMongoDB from "../../../libs/mongodb";
import Booking from "../../../models/Booking";
import Apartment from "../../../models/Apartment";
import nodemailer from "nodemailer";
import { format } from "date-fns";

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

      // Check if apartment is available for requested dates
    const overlap = await Booking.findOne({
      apartment: body.apartmentId,
      status: "accepted",
      $or: [
        { checkIn: { $lt: new Date(body.checkOut) }, checkOut: { $gt: new Date(body.checkIn) } }
      ]
    });

    if (overlap) {
      return res.status(400).json({ message: "Apartment is already booked for these dates" });
    }


      const booking = await Booking.create({
        apartment: body.apartmentId,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
      });
      const populatedBooking = await Booking.findById(booking._id).populate("apartment");
      // console.log(populatedBooking.apartment); 
      const formattedCheckIn = format(new Date(booking.checkIn), "EEE, dd MMM yyyy");
      const formattedCheckOut = format(new Date(booking.checkOut), "EEE, dd MMM yyyy");

      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: booking.email,
        subject: "Booking Request Received - Oaa Travel",
        html: 
        `
          <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Booking Request Received - Oaa Travel</title>
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
                  <h2 style="color: #333;">Booking Request Received</h2>
                  <p>Hello <strong>${booking.fullName}</strong>,</p>
                  <p>Thank you for choosing Oaa Travel. We’ve received your booking request for <strong>${populatedBooking.apartment.name}</strong>.</p>
                  <p><em>Please note: Your booking is not yet confirmed. To secure your reservation, kindly make payment using the bank details below. Once payment is confirmed, you will receive another email confirming acceptance of your booking.</em></p>
                  
                  <table width="100%" cellpadding="10" cellspacing="0" style="background: #f3f3f3; border-radius: 6px; margin: 20px 0;">
                    <tr>
                      <td><strong>Check-in:</strong></td>
                      <td>${formattedCheckIn}</td>
                    </tr>
                    <tr>
                      <td><strong>Check-out:</strong></td>
                      <td>${formattedCheckOut}</td>
                    </tr>
                    <tr>
                      <td><strong>Location:</strong></td>
                      <td>${populatedBooking.apartment.location}</td>
                    </tr>
                    <tr>
                      <td><strong>Price:</strong></td>
                      <td>₦${populatedBooking.apartment.pricePerNight} / Night</td>
                    </tr>
                  </table>

                  <h3 style="margin-top: 20px; color: #0077b6;">Payment Details</h3>
                  <p>Please make payment to the following account:</p>
                  <table width="100%" cellpadding="10" cellspacing="0" style="background: #eaf4fc; border-radius: 6px; margin: 10px 0;">
                    <tr>
                      <td><strong>Bank Name:</strong></td>
                      <td>Ecobank Bank </td>
                    </tr>
                    <tr>
                      <td><strong>Account Name:</strong></td>
                      <td>OAA TRAVEL AGENCY</td>
                    </tr>
                    <tr>
                      <td><strong>Account Number:</strong></td>
                      <td>2930044357</td>
                    </tr>
                  </table>

                  <h3 style="margin-top: 20px; color: #0077b6;">Need Help?</h3>
                  <p>If you have any questions or enquiries, please call us at <strong>+234 706 381 6404</strong> or simply reply to this email. Our team will be glad to assist you.</p>

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
              <td>${booking.fullName}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${booking.email}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td>${booking.phone}</td>
            </tr>
            <tr>
              <td><strong>Apartment:</strong></td>
              <td>${populatedBooking.apartment.name} (₦${populatedBooking.apartment.pricePerNight}/night)</td>
            </tr>
            <tr>
              <td><strong>Check-in:</strong></td>
              <td>${formattedCheckIn}</td>
            </tr>
            <tr>
              <td><strong>Check-out:</strong></td>
              <td>${formattedCheckOut}</td>
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
      const { id, apartmentId, start, end } = req.query;

      if (id) {
        const booking = await Booking.findById(id).populate("apartment");
        if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
        }
      }

      if (apartmentId) {
      const bookings = await Booking.find({ apartment: apartmentId });

      // collect all days between checkIn and checkOut
      const bookedDates = bookings.flatMap(b => {
        const start = new Date(b.checkIn);
        const end = new Date(b.checkOut);
        const dates = [];
        let curr = new Date(start);
        while (curr <= end) {
          dates.push(curr.toISOString().split("T")[0]); // format YYYY-MM-DD
          curr.setDate(curr.getDate() + 1);
        }
        return dates;
      });

      return res.status(200).json({ bookedDates });
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
  
  if (req.method === "PATCH") {
  const { id } = req.query;
  const { action } = req.body; 
  if (!id) return res.status(400).json({ message: "Missing booking id" });

  const booking = await Booking.findById(id).populate("apartment");
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  
  const formattedCheckIn = format(new Date(booking.checkIn), "EEE, dd MMM yyyy");
  const formattedCheckOut = format(new Date(booking.checkOut), "EEE, dd MMM yyyy");

  if (action === "accept") {
    booking.status = "accepted";
    await booking.save();

    // Send acceptance email
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: booking.email,
      subject: "Booking Confirmed - Oaa Travel",
      html: `
          <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Booking Confirmed - Oaa Travel</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f2f6fa; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <tr>
        <td style="background: #009688; color: #ffffff; padding: 25px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Booking Confirmed 🎉</h1>
          <p style="margin: 0; font-size: 14px;">Thank you for completing your payment with Oaa Travel</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 25px;">
          <p style="font-size: 16px; color: #333;">Dear <strong>${booking.fullName}</strong>,</p>
          <p style="font-size: 15px; color: #444; line-height: 1.6;">
            We’re excited to let you know that your booking at 
            <strong>${booking.apartment.name}</strong> has been confirmed and secured.  
            We look forward to hosting you and ensuring a smooth stay.
          </p>

          <h3 style="color: #009688; margin-top: 20px;">Booking Details</h3>
          <table width="100%" cellpadding="10" cellspacing="0" style="background: #f9f9f9; border-radius: 6px; margin: 15px 0;">
            <tr>
              <td><strong>Check-in:</strong></td>
              <td>${formattedCheckIn}</td>
            </tr>
            <tr>
              <td><strong>Check-out:</strong></td>
              <td>${formattedCheckOut}</td>
            </tr>
            <tr>
              <td><strong>Location:</strong></td>
              <td>${booking.apartment.location}</td>
            </tr>
            <tr>
              <td><strong>Total Paid:</strong></td>
              <td>₦${booking.apartment.pricePerNight} / Night</td>
            </tr>
          </table>

          <h3 style="color: #009688; margin-top: 20px;">What’s Next?</h3>
          <p style="font-size: 15px; color: #444; line-height: 1.6;">
            Simply arrive on your scheduled check-in date. Our support team will be on hand to assist with any special requests or questions before your stay.
          </p>

          <h3 style="color: #009688; margin-top: 20px;">Need Assistance?</h3>
          <p style="font-size: 15px; color: #444;">
            If you have any enquiries, please call us at <strong>+234 706 381 6404</strong> or reply to this email.  
          </p>

          <p style="margin-top: 25px; font-size: 15px; color: #333;">Warm regards,  
          <br><strong>The Oaa Travel Team</strong></p>
        </td>
      </tr>
      <tr>
        <td style="background: #009688; color: #ffffff; text-align: center; padding: 12px; font-size: 12px;">
          © 2025 Oaa Travel. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>

      `
    });

    return res.json({ message: "Booking accepted", booking });
  }

  if (action === "reject") {
    booking.status = "cancelled";
    await booking.save();

    // Send rejection email
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: booking.email,
      subject: "Booking Rejected - Oaa Travel",
      html: `
            <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Booking Declined - Oaa Travel</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #faf4f4; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <tr>
        <td style="background: #c62828; color: #ffffff; padding: 25px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Booking Declined</h1>
          <p style="margin: 0; font-size: 14px;">We’re sorry, but your booking could not be accepted</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 25px;">
          <p style="font-size: 16px; color: #333;">Dear <strong>${booking.fullName}</strong>,</p>
          <p style="font-size: 15px; color: #444; line-height: 1.6;">
            We regret to inform you that your booking request for 
            <strong>${populatedBooking.apartment.name}</strong> could not be accepted at this time.
          </p>

          <h3 style="color: #c62828; margin-top: 20px;">Booking Details</h3>
          <table width="100%" cellpadding="10" cellspacing="0" style="background: #fef0f0; border-radius: 6px; margin: 15px 0;">
            <tr>
              <td><strong>Check-in:</strong></td>
              <td>${formattedCheckIn}</td>
            </tr>
            <tr>
              <td><strong>Check-out:</strong></td>
              <td>${formattedCheckOut}</td>
            </tr>
            <tr>
              <td><strong>Location:</strong></td>
              <td>${populatedBooking.apartment.location}</td>
            </tr>
          </table>

          <p style="font-size: 15px; color: #444; line-height: 1.6;">
            If you already made payment, please contact our support team for assistance with a refund or to discuss alternative options.  
          </p>

          <h3 style="color: #c62828; margin-top: 20px;">Need Assistance?</h3>
          <p style="font-size: 15px; color: #444;">
            Please call us at <strong>+234 706 381 6404</strong> or reply to this email if you would like to book a different apartment or have any further enquiries.
          </p>

          <p style="margin-top: 25px; font-size: 15px; color: #333;">We sincerely apologize for the inconvenience.  
          <br><strong>The Oaa Travel Team</strong></p>
        </td>
      </tr>
      <tr>
        <td style="background: #c62828; color: #ffffff; text-align: center; padding: 12px; font-size: 12px;">
          © 2025 Oaa Travel. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>

      `
    });

    return res.json({ message: "Booking rejected", booking });
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
