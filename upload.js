import express from "express";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();


router.post("/sign", (req, res) => {
	const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
	if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
		return res.status(500).json({ message: "Cloudinary is not configured on the server" });
	}

	const timestamp = Math.round(Date.now() / 1000);
	const folder = "Site-Back-End";

	// Sign exactly the values the browser will send (timestamp and folder)
	const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, CLOUDINARY_API_SECRET);

	res.json({
		cloudName: CLOUDINARY_CLOUD_NAME,
		apiKey: CLOUDINARY_API_KEY,
		timestamp,
		folder,
		signature,
	});
});

export default router;