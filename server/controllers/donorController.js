// controllers/donorController.js
import Donor from "../models/Donor.js";

console.log("Donor model loaded:", Donor); // ✅ Add this line

export const registerDonor = async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: 'Donor registered successfully', donor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register donor', details: error.message });
  }
};

export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find(); // <-- Error was here if Donor isn't imported correctly
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donors', details: error.message });
  }
};
