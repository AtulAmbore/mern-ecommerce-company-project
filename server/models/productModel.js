import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      unique: true,
      required: true,
    },
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    availabilityStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Low Stock"],
      default: "In Stock",
    },
    images: [String],
    thumbnail: String,
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
