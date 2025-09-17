import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Apartment || mongoose.model("Apartment", ApartmentSchema);
