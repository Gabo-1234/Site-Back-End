import dotenv from "dotenv";
import mongoose from "mongoose";
import Category from "../models/category.js";
import Product from "../models/product.js";

dotenv.config();

async function seed() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		await Product.deleteMany({});
		await Category.deleteMany({});

		const [keyboards, mice, accessories] = await Category.insertMany([
			{ name: "Keyboards", slug: "keyboards" },
			{ name: "Mice", slug: "mice" },
			{ name: "Accessories", slug: "accessories" },
		]);

		await Product.insertMany([
			{ name: "Forge 75", price: 89, stock: 14, category: keyboards._id },
			{ name: "Air 60", price: 69, stock: 20, category: keyboards._id },
			{ name: "Studio TKL", price: 109, stock: 8, category: keyboards._id },
			{ name: "Glide Wireless", price: 49, stock: 25, category: mice._id },
			{ name: "Track Pro", price: 79, stock: 11, category: mice._id },
			{ name: "Travel Mouse", price: 29, stock: 30, category: mice._id },
			{ name: "Desk Mat", price: 24, stock: 40, category: accessories._id },
			{ name: "USB-C Hub", price: 39, stock: 18, category: accessories._id },
		]);

		console.log("Done: seeded 3 categories and 8 products");
	} catch (err) {
		console.error("Seed failed:", err);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
	}
}

seed();
