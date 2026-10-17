import express from "express";
import Category from "../models/category.js";
import Product from "../models/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const categories = await Category.find()
		.populate("parent", "name slug")
		.sort({ name: 1 });
	res.json(categories);
});

router.get("/:id", async (req, res) => {
	const category = await Category.findById(req.params.id).populate("parent", "name slug");
	if (!category) return res.status(404).json({ message: "Category not found" });
	res.json(category);
});

router.post("/", async (req, res) => {
	const category = await Category.create(req.body);
	res.status(201).json(category);
});

router.put("/:id", async (req, res) => {
	const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
		returnDocument: "after",
		runValidators: true,
	}).populate("parent", "name slug");
	if (!category) return res.status(404).json({ message: "Category not found" });
	res.json(category);
});

router.delete("/:id", async (req, res) => {
	if (await Product.exists({ category: req.params.id })) {
		return res.status(409).json({ message: "Category still has products" });
	}
	if (await Category.exists({ parent: req.params.id })) {
		return res.status(409).json({ message: "Category still has sub-categories" });
	}

	const category = await Category.findByIdAndDelete(req.params.id);
	if (!category) return res.status(404).json({ message: "Category not found" });
	res.json({ message: "Category deleted" });
});

export default router;
