import axios from "axios";
import { productModel } from "../models/productModel.js";

export const importProductsController = async (req, res) => {
  try {
    const count = await productModel.countDocuments();
    if (count > 0) {
      return res.status(200).json({
        success: true,
        msg: "Products already exist, skipping import",
      });
    }
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;
    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "No products received from external API",
      });
    }
    const bulkOps = products.map((item) => ({
      updateOne: {
        filter: { productId: item.id },
        update: {
          $set: {
            productId: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            brand: item.brand,
            price: item.price,
            discountPercentage: item.discountPercentage,
            rating: item.rating,
            stock: item.stock,
            availabilityStatus:
              item.stock === 0
                ? "Out of Stock"
                : item.stock < 10
                  ? "Low Stock"
                  : "In Stock",
            images: item.images,
            thumbnail: item.thumbnail,
          },
        },
        upsert: true, // 🔥 prevents duplicates
      },
    }));
    await productModel.bulkWrite(bulkOps);
    return res.status(200).json({
      success: true,
      count: bulkOps.length,
      msg: "Products imported successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: `Backend - Product import failed - ${err.message}`,
    });
  }
};

export const getProductsController = async (req, res) => {
  try {
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 20;
    // const skip = (page - 1) * limit;

    // const [products, total] = await Promise.all([
    //   productModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    //   productModel.countDocuments(),
    // ]);
    const [products, total] = await Promise.all([
      productModel.find(),
      productModel.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      products,
      total,
      msg: "Products fetch Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

// controllers/productController.js
export const getProductByIdController = async (req, res) => {
  try {
    const product = await productModel.findOne({
      productId: req.params.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
