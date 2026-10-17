import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const filter = {};
	if (req.query.category) filter.category = req.query.category;

	const products = await Product.find(filter)
		.populate("category", "name slug")
		.sort({ createdAt: -1 });
	res.json(products);
});

router.get("/:id", async (req, res) => {
	const product = await Product.findById(req.params.id).populate("category", "name slug");
	if (!product) return res.status(404).json({ message: "Product not found" });
	res.json(product);
});

router.post("/", async (req, res) => {
	const product = await Product.create(req.body);
	await product.populate("category", "name slug");
	res.status(201).json(product);
});

router.put("/:id", async (req, res) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		returnDocument: "after",
		runValidators: true,
	}).populate("category", "name slug");
	if (!product) return res.status(404).json({ message: "Product not found" });
	res.json(product);
});

router.delete("/:id", async (req, res) => {
	const product = await Product.findByIdAndDelete(req.params.id);
	if (!product) return res.status(404).json({ message: "Product not found" });
	res.json({ message: "Product deleted" });
});

export default router;
