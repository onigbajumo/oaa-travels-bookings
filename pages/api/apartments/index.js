import connectToMongoDB from "../../../libs/mongodb";
import Apartment from "../../../models/Apartment";

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method === "GET") {
    try {
      const apartments = await Apartment.find();
      return res.status(200).json(apartments);
    } catch (error) {
      console.error("Error fetching apartments:", error);
      return res.status(500).json({ message: "Error fetching apartments", error });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, location, pricePerNight } = req.body;
      if (!name || !location || !pricePerNight) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const apartment = await Apartment.create({
        name,
        location,
        pricePerNight,
      });

      return res.status(201).json({ message: "Apartment created", apartment });
    } catch (error) {
      console.error("Error creating apartment:", error);
      return res.status(500).json({ message: "Error creating apartment", error });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
