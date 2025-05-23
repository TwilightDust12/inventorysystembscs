import Product from "../models/product.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
    const product = req.body;
    
    if(!product.name || !product.price || !product.quantity || !product.image) {
        return res.status(400).json({success:false, message: "Provide all fields"});
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});

    } catch(error) {
        console.error("Error in Creating product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid product id"})
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    } catch(error) {
        console.log(error.message)
        res.status(500).json({success: false, messasge: "Server Error"});
    } 
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    // if (!product || Object.keys(product).length === 0) {
    //     return res.status(400).json({success: false, message: "Request body is empty"});
    // }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid product id"})
    }

    try {
        const updated_product = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updated_product});
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};