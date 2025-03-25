"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in touch</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium text-gray-800">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-md outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Your name..."
                required
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium text-gray-800">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-md outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Your phone number..."
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="Your email address..."
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-800">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md outline-none focus:ring-1 focus:ring-gray-500 h-28 resize-none"
              placeholder="Your message..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white text-lg font-semibold py-3 rounded-md hover:bg-red-600 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
