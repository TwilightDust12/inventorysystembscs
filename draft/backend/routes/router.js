import express from "express";

import { addProduct, deleteProduct, getProduct, updateProduct } from "../controller/productController.js";

const router = express.Router();

//func to add
router.post("/", addProduct);

//fund to delete 
router.delete("/id", deleteProduct) ;

//func to get
router.get("/", getProduct);

//funct to update
router.put("/:id",updateProduct );

export default router;