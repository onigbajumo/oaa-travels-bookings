"use client";
import { useState, useEffect } from "react";
import { useToast, Box } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function BookingPage() {
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const [form, setForm] = useState({
    apartmentId: "",
    fullName: "",
    email: "",
    phone: "",
    checkIn: null,
    checkOut: null,
  });

  // Load apartments
  useEffect(() => {
    async function fetchApartments() {
      try {
        const res = await fetch("/api/apartments");
        const data = await res.json();
        setApartments(data);
      } catch (err) {
        console.error("Failed to fetch apartments", err);
      }
    }
    fetchApartments();
  }, []);

  // Load booked dates when apartment changes
  async function handleApartmentChange(e) {
    const apartmentId = e.target.value;
    setForm((prev) => ({ ...prev, apartmentId }));
    const apt = apartments.find((a) => a._id === apartmentId);
    setSelectedApartment(apt || null);

    if (apartmentId) {
      try {
        const res = await fetch(`/api/bookings?apartmentId=${apartmentId}`);
        const data = await res.json();
        if (res.ok && data.bookedDates) {
          setBookedDates(data.bookedDates.map((d) => new Date(d)));
        } else {
          setBookedDates([]);
        }
      } catch (err) {
        console.error("Failed to fetch booked dates", err);
      }
    }
  }

  // Handle booking submit
  async function handleBooking(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          checkIn: form.checkIn ? form.checkIn.toISOString().split("T")[0] : "",
          checkOut: form.checkOut ? form.checkOut.toISOString().split("T")[0] : "",
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Booking Request Received",
          description:
            "Your booking request has been submitted. Please check your email for payment details and next steps.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });

        // Reset form
        setForm({
          fullName: "",
          email: "",
          phone: "",
          checkIn: null,
          checkOut: null,
          apartmentId: "",
        });
        setSelectedApartment(null);
        setBookedDates([]);
      } else {
        toast({
          title: "Error",
          description: data.message || "Booking request failed",
          status: "error",
        });
      }
    } catch (err) {
      toast({
        title: "Failed",
        description: "Booking request not submitted",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Short Let</h1>

      <form
        onSubmit={handleBooking}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* User Info */}
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="border px-3 py-2 rounded w-full"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border px-3 py-2 rounded w-full"
          placeholder="Email"
          required
        />

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border px-3 py-2 rounded w-full"
          placeholder="Phone Number"
          required
        />

        {/* Apartment Selection */}
        <select
          name="apartmentId"
          value={form.apartmentId}
          onChange={handleApartmentChange}
          className="border px-3 py-2 rounded w-full"
          required
        >
          <option value="">-- Choose an Apartment --</option>
          {apartments.map((apt) => (
            <option key={apt._id} value={apt._id}>
              {apt.name} - {apt.location} - ₦{apt.pricePerNight}/Night
            </option>
          ))}
        </select>

        {selectedApartment && (
          <div className="bg-gray-50 p-4 rounded border">
            <p>
              <strong>Location:</strong> {selectedApartment.location}
            </p>
            <p>
              <strong>Price:</strong> ₦{selectedApartment.pricePerNight} / Night
            </p>
          </div>
        )}

        {/* Calendar Range Picker */}
        <div className="text-center my-6">
          <h2 className="text-lg font-semibold mb-4">Select Your Stay Dates</h2>
          <Box
            border="1px"
            borderColor="gray.200"
            rounded="lg"
            shadow="sm"
            display="flex"
            justifyContent="center"
            p={4}
            mx="full"
            maxW="full"
          >
            <DayPicker
              mode="range"
              selected={{ from: form.checkIn, to: form.checkOut }}
              onSelect={(range) =>
                setForm((prev) => ({
                  ...prev,
                  checkIn: range?.from || null,
                  checkOut: range?.to || null,
                }))
              }
              disabled={[
              { before: new Date() },   
              ...bookedDates.map((d) => ({ date: d })), 
              ]}
              numberOfMonths={2}  
              styles={{
                caption: { color: "#0077b6", fontWeight: "bold", textAlign: "center" },
                day_selected: { backgroundColor: "#009688", color: "white" },
                day_disabled: {
                  color: "#fff",
                  backgroundColor: "#c53030",   // red background
                  opacity: 0.7,
                  borderRadius: "6px",
                  textDecoration: "line-through",
                },
                day_range_middle: { backgroundColor: "#e6fffa" },
              }}
            />
          </Box>
        </div>


        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white px-6 py-2 rounded-lg transition ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Booking Request"}
        </button>
      </form>
    </div>
  );
}
