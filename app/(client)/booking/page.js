"use client";
import { useState, useEffect } from "react";
import {
 
  Alert,
  useToast,
  AlertIcon,
} from "@chakra-ui/react";

export default function BookingPage() {
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [form, setForm] = useState({
    apartmentId: "",
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });

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

  function handleApartmentChange(e) {
    const apartmentId = e.target.value;
    setForm((prev) => ({ ...prev, apartmentId }));
    const apt = apartments.find((a) => a.id === apartmentId);
    setSelectedApartment(apt || null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleBooking(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {

        toast({
        title: "Success",
        description: "Booking submitted successfully",
        status: "success",
      });
      
      setForm({
        fullName: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        apartmentId: "",
      });
      setSelectedApartment(null);
      } else {
        toast({
          title: "Error",
          description: data.message || "Booking failed",
          status: "error",
        });
      }
    } catch (err) {
      toast({
        title: "Failed",
        description: "Booking not submited",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Book Short Let
      </h1>

      <form
        onSubmit={handleBooking}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* User Info */}
        <div>
          <label className="block mb-1">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Apartment Selection */}
        <div>
          <label className="block mb-1">Select Apartment:</label>
          <select
            name="apartmentId"
            value={form.apartmentId}
            onChange={handleApartmentChange}
            className="border px-3 py-2 rounded w-full"
            required
          >
            <option value="">-- Choose an Apartment --</option>
            {apartments.map((apt) => (
              <option key={apt.id} value={apt._id}>
                {apt.name} - {apt.location} - ₦{apt.pricePerNight}/Night
              </option>
            ))}
          </select>
        </div>

        {selectedApartment && (
          <div className="bg-gray-50 p-4 rounded border">
            <p>
              <strong>Location:</strong> {selectedApartment.location}
            </p>
            <p>
              <strong>Price:</strong> ${selectedApartment.pricePerNight} / Night
            </p>
          </div>
        )}

        <div>
          <label className="block mb-1">Check-in Date:</label>
          <input
            type="date"
            name="checkIn"
            value={form.checkIn}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Check-out Date:</label>
          <input
            type="date"
            name="checkOut"
            value={form.checkOut}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white px-6 py-2 rounded-lg  transition ${
            isSubmitting ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700" 
      }`}
        >
          {isSubmitting ? "Subbmiting..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
