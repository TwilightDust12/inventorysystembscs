import express from "express";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controller/productController.js";

const router = express.Router();

router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProduct);
router.put("/:id", updateProduct);

export default router;