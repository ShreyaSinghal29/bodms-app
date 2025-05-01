import express from "express";
import axios from "axios";
import Donor from "../models/Donor.js";

const router = express.Router();

// Donor registration route
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      donorId,
      contact,
      bloodType,
      organ,
      age,
      gender,
      location,
      hlaType,
      urgencyLevel,
      recipientBloodType,     // Assume this is passed from frontend
      recipientRh,            // "
      recipientAge,           // "
      recipientLat,           // "
      recipientLon            // "
    } = req.body;

    // 🔗 Prepare FastAPI input data
    const aiInput = {
      Donor_BloodType: bloodType,
      Recipient_BloodType: recipientBloodType,
      Donor_Rh: "+", // Default for now, unless user enters it
      Recipient_Rh: recipientRh || "+",
      Organ_Type: organ,
      Donor_Age: age,
      Recipient_Age: recipientAge,
      Donor_Lat: location.coordinates.lat,
      Donor_Lon: location.coordinates.lng,
      Recipient_Lat: recipientLat,
      Recipient_Lon: recipientLon
    };

    // 🧠 Send to FastAPI AI
    const aiResponse = await axios.post("http://localhost:8000/predict", aiInput);
    const matchResult = aiResponse.data.match_result;

    // 💾 Save donor with matchResult
    const newDonor = new Donor({
      name,
      donorId,
      contact,
      bloodType,
      organ,
      age,
      gender,
      location,
      hlaType,
      urgencyLevel,
      matchResult   // ✅ store AI output
    });

    await newDonor.save();

    res.status(201).json({
      message: "Donor registered successfully.",
      donor: newDonor,
      matchResult
    });

  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ error: "Donor registration failed." });
  }
});

export default router;
