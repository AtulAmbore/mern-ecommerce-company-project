import axios from "axios";
import { productModel } from "../models/productModel.js";

export const importProductsFromAPI = async () => {
  const response = await axios.get("https://dummyjson.com/products", {
    timeout: 10000,
  });

  const products = response.data.products;

  if (!products || products.length === 0) {
    throw new Error("No products received from external API");
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
      upsert: true,
    },
  }));

  await productModel.bulkWrite(bulkOps);

  return bulkOps.length;
};
