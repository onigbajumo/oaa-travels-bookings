import connectToMongoDB from "../../../libs/mongodb";
import Apartment from "../../../models/Apartment";

export default async function handler(req, res) {
  await connectToMongoDB();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const apartment = await Apartment.findById(id);
      if (!apartment) return res.status(404).json({ message: "Apartment not found" });
      return res.status(200).json(apartment);
    } catch (error) {
      console.error("Error fetching apartment:", error);
      return res.status(500).json({ message: "Error fetching apartment", error });
    }
  }

  if (req.method === "PUT") {
    try {
      const { name, location, pricePerNight } = req.body;
      const apartment = await Apartment.findByIdAndUpdate(
        id,
        { name, location, pricePerNight },
        { new: true }
      );
      if (!apartment) return res.status(404).json({ message: "Apartment not found" });
      return res.status(200).json({ message: "Apartment updated", apartment });
    } catch (error) {
      console.error("Error updating apartment:", error);
      return res.status(500).json({ message: "Error updating apartment", error });
    }
  }

  if (req.method === "DELETE") {
    try {
      const apartment = await Apartment.findByIdAndDelete(id);
      if (!apartment) return res.status(404).json({ message: "Apartment not found" });
      return res.status(200).json({ message: "Apartment deleted" });
    } catch (error) {
      console.error("Error deleting apartment:", error);
      return res.status(500).json({ message: "Error deleting apartment", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
