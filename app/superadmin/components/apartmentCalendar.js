"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function ApartmentCalendar({ bookings }) {
  const events = bookings.map((b) => ({
    id: b._id,
    title: `${b.fullName || "Booking"} (${b.status})`,
    start: b.checkIn,
    end: b.checkOut,
    color:
      b.status === "accepted"
        ? "#38a169" // green
        : b.status === "pending"
        ? "#dd6b20" // orange
        : "#e53e3e", // red
  }));

  return (
    <div className="mt-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="400px"
      />
    </div>
  );
}
