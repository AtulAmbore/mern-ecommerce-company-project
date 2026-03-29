import { productModel } from "../models/productModel.js";
import { importProductsFromAPI } from "./importProductsFromAPI.js";

export const initProducts = async () => {
  try {
    const count = await productModel.countDocuments();

    if (count === 0) {
      console.log("No products found. Importing from external API...");
      const importedCount = await importProductsFromAPI();
      console.log(`Imported ${importedCount} products`);
    } else {
      console.log("Products already exist. Skipping import.");
    }
  } catch (err) {
    console.error("Product initialization failed:", err.message);
  }
};
