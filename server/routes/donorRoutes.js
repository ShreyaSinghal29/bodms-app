// routes/donorRoutes.js
import express from "express";
import { registerDonor, getDonors } from "../controllers/donorController.js";

const router = express.Router();

router.post("/", registerDonor);
router.get("/", getDonors);

export default router;
