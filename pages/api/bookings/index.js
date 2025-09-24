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

export function formatPrice(value) {
  if (!value || isNaN(value)) return "₦0";
  return value.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });
}

// utils/dates.js (or inline in your API file)

// Convert many shapes into a Date at UTC midnight
function toUTCDate(input) {
  if (!input) return null;

  // Already a Date?
  if (input instanceof Date && !isNaN(input)) return new Date(Date.UTC(
    input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()
  ));

  // ISO string "YYYY-MM-DD"
  if (typeof input === 'string') {
    // Force UTC midnight to avoid TZ/DST bugs
    const d = new Date(`${input}T00:00:00Z`);
    return isNaN(d) ? null : d;
  }

  // Array [year, month, day] — assume 1-based month; fix to 0-based
  if (Array.isArray(input) && input.length >= 3) {
    const [y, m, d] = input.map(Number);
    if (!y || !m || !d) return null;
    return new Date(Date.UTC(y, m - 1, d));
  }

  // Object {year, month, day}
  if (typeof input === 'object' && input.year && input.month && input.day) {
    const y = Number(input.year);
    const m = Number(input.month);
    const d = Number(input.day);
    if (!y || !m || !d) return null;
    // If month looks 0-based, adjust to 0..11; if 1..12, subtract 1
    const zeroBasedMonth = m > 11 ? m - 1 : (m >= 1 ? m - 1 : 0);
    return new Date(Date.UTC(y, zeroBasedMonth, d));
  }

  return null;
}

function diffNightsUTC(fromDate, toDate) {
  if (!fromDate || !toDate) return NaN;
  const ms = toDate.getTime() - fromDate.getTime();
  if (isNaN(ms)) return NaN;
  // Exact day difference in UTC
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}



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

    const checkIn = toUTCDate(body.checkIn);
    const checkOut = toUTCDate(body.checkOut);

    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: "Invalid check-in/check-out dates", raw: { checkIn: body.checkIn, checkOut: body.checkOut } });
    }

    const nights = diffNightsUTC(checkIn, checkOut);
    if (isNaN(nights)) {
      return res.status(400).json({ message: "Could not compute nights" });
    }

    const pricePerNight = Number(apartment.pricePerNight) || 0;
    const totalPrice = pricePerNight * nights;
    // console.log("Total Price:", totalPrice);
    // console.log("Nights:", nights);
    // console.log("Price per Night:", apartment.pricePerNight);

      const booking = await Booking.create({
        apartment: body.apartmentId,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        totalPrice,
      });
      const populatedBooking = await Booking.findById(booking._id).populate("apartment");
      
      const formattedCheckIn = format(new Date(booking.checkIn), "EEE, dd MMM yyyy");
      const formattedCheckOut = format(new Date(booking.checkOut), "EEE, dd MMM yyyy");

      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: booking.email,
        subject: "Booking Request Received - OAA Travel",
        html: 
        `
          <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>Booking Request Received - OAA Travel</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              <tr>
                <td style="background: #0077b6; color: #ffffff; padding: 20px; text-align: center;">
                  <h1 style="margin: 0; font-size: 22px;">OAA Travel</h1>
                  <p style="margin: 0;">Your trusted travel partner</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <h2 style="color: #333;">Booking Request Received</h2>
                  <p>Hello <strong>${booking.fullName}</strong>,</p>
                  <p>Thank you for choosing OAA Travel. We’ve received your booking request for <strong>${populatedBooking.apartment.name}</strong>.</p>
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
                      <td><strong>Price per night:</strong></td>
                      <td>${formatPrice(populatedBooking.apartment.pricePerNight)} / Night</td>
                    </tr>
                    <tr>
                      <td><strong>Total Price:</strong></td>
                      <td>${formatPrice(populatedBooking.totalPrice)} / Night</td>
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
                  <br><strong>The OAA Travel Team</strong></p>
                </td>
              </tr>
              <tr>
                <td style="background: #0077b6; color: #ffffff; text-align: center; padding: 10px; font-size: 12px;">
                  © 2025 OAA Travel. All rights reserved.
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
    <title>New Booking - OAA Travel</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <tr>
        <td style="background: #023e8a; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px;">OAA Travel</h1>
          <p style="margin: 0;">Admin Booking Alert</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <h2 style="color: #333;">New Booking Received</h2>
          <p>A new booking has been made via OAA Travel:</p>

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
              <td>${populatedBooking.apartment.name} (${formatPrice(populatedBooking.apartment.pricePerNight)}/night)</td>
            </tr>
            <tr>
              <td><strong>Total Price:</strong></td>
              <td>${formatPrice(populatedBooking.totalPrice)}</td>
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
          © 2025 OAA Travel Admin Portal
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
      subject: "Booking Confirmed - OAA Travel",
      html: `
          <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Booking Confirmed - OAA Travel</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f2f6fa; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <tr>
        <td style="background: #009688; color: #ffffff; padding: 25px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Booking Confirmed 🎉</h1>
          <p style="margin: 0; font-size: 14px;">Thank you for completing your payment with OAA Travel</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 25px;">
          <p style="font-size: 16px; color: #333;">Dear <strong>${booking.fullName}</strong>,</p>
          <p style="font-size: 15px; color: #444; line-height: 1.6;">
            We’re excited to let you know that your booking at 
            <strong>${booking.apartment.name}</strong> has been confirmed.  
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
              <td><strong>Price per night:</strong></td>
              <td>${formatPrice(booking.apartment.pricePerNight)} / Night</td>
            </tr>
             <tr>
              <td><strong>Total Price:</strong></td>
              <td>${formatPrice(booking.totalPrice)}</td>
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
          <br><strong>The OAA Travel Team</strong></p>
        </td>
      </tr>
      <tr>
        <td style="background: #009688; color: #ffffff; text-align: center; padding: 12px; font-size: 12px;">
          © 2025 OAA Travel. All rights reserved.
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
      subject: "Booking Rejected - OAA Travel",
      html: `
            <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Booking Declined - OAA Travel</title>
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
            <strong>${booking.apartment.name}</strong> could not be accepted at this time.
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
              <td>${booking.apartment.location}</td>
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
          <br><strong>The OAA Travel Team</strong></p>
        </td>
      </tr>
      <tr>
        <td style="background: #c62828; color: #ffffff; text-align: center; padding: 12px; font-size: 12px;">
          © 2025 OAA Travel. All rights reserved.
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
