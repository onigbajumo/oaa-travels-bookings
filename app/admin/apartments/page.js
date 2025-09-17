"use client";
import { useState, useEffect } from "react";

export default function AdminApartmentsPage() {
  const [apartments, setApartments] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", pricePerNight: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch apartments
  useEffect(() => {
    fetchApartments();
  }, []);

  async function fetchApartments() {
    const res = await fetch("/api/apartments");
    const data = await res.json();
    setApartments(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Add or Update apartment
  async function handleSubmit(e) {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/apartments/${editingId}` : "/api/apartments";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || "Saved");

    setForm({ name: "", location: "", pricePerNight: "" });
    setEditingId(null);
    fetchApartments();
  }

  // Edit apartment
  function handleEdit(apartment) {
    setForm({
      name: apartment.name,
      location: apartment.location,
      pricePerNight: apartment.pricePerNight,
    });
    setEditingId(apartment._id);
  }

  // Delete apartment
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this apartment?")) return;

    const res = await fetch(`/api/apartments/${id}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.message);
    fetchApartments();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Apartments</h1>

      {/* Apartment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Apartment Name"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <input
          type="number"
          name="pricePerNight"
          placeholder="Price Per Night"
          value={form.pricePerNight}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {editingId ? "Update Apartment" : "Add Apartment"}
        </button>
      </form>

      {/* Apartment List */}
      <h2 className="text-xl font-semibold mb-2">Apartments</h2>
      <div className="space-y-3">
        {apartments.length === 0 && <p>No apartments found</p>}
        {apartments.map((apartment) => (
          <div
            key={apartment._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{apartment.name}</p>
              <p>{apartment.location}</p>
              <p>₦{apartment.pricePerNight} / night</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(apartment)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(apartment._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
