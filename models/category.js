import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Category name is required"],
			trim: true,
		},
		slug: {
			type: String,
			required: [true, "Category slug is required"],
			trim: true,
			lowercase: true,
			unique: true,
		},
		parent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			default: null,
		},
	},
	{ timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
