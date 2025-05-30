import express from "express";
import Product from "../models/product.js";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controller/productController.js";

const router = express.Router();

router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProduct);
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const price = Number(req.body.price);
  const quantity = Number(req.body.quantity);

  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { $set: { price, quantity } },
      { new: true }
    );
    if (!updated) return res.status(404).send("Product not found");
    res.json(updated);
  } catch (err) {
    res.status(500).send("Failed to update product");
  }
});

export default router;