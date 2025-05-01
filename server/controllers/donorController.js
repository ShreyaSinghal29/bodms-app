// controllers/donorController.js
import Donor from "../models/Donor.js";

// Create a new donor
export const registerDonor = async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: "Donor registered successfully", donor });
  } catch (error) {
    res.status(500).json({ error: "Failed to register donor", details: error.message });
  }
};

// Get all donors
export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donors", details: error.message });
  }
};
