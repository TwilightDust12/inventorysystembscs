import express from "express";
import Product from "../models/product.js";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controller/productController.js";

const router = express.Router();

router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProduct);
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { price, quantity } = req.body;

  console.log("Received PUT request for product:", id);
  console.log("Data to update:", { price, quantity });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: { price, quantity } },
      { new: true }
    );

    if (!updatedProduct) {
      console.log("Product not found:", id);
      return res.status(404).send("Product not found");
    }

    console.log("Product updated successfully:", updatedProduct);
    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send("Failed to update product");
  }
});

export default router;