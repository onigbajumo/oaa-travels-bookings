"use client";
import { useEffect, useState } from "react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading) return <p className="p-6">Loading bookings...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bookings Dashboard</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Apartment</th>
                <th className="py-3 px-4">Check-In</th>
                <th className="py-3 px-4">Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="py-2 px-4">{booking.fullName}</td>
                  <td className="py-2 px-4">{booking.email}</td>
                  <td className="py-2 px-4">{booking.phone}</td>
                  <td className="py-2 px-4">
                    {booking.apartment?.name || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
