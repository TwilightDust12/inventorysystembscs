import authRoutes from "./routes/auth.js";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnect.js";
import productRoutes from "./routes/router.js";
import path from 'path';
import { fileURLToPath } from 'url';
import contactRoutes from "./routes/contact.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- Add this for form POST

// Serve static files (must be before routes)
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve landing page at root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/landing.html"));
});

// API/auth routes
app.use("/", authRoutes);
app.use("/", contactRoutes);
app.use("/api/products/", productRoutes);

//address
app.listen(PORT, () => {
    connectDB();
    console.log("Server started http://localhost:" + PORT);
});

// Error handling for adding product
app.use((err, req, res, next) => {
    if (err.message.includes("add product")) {
        console.error("Add product error (controller):", err);
        return res.status(400).json({ success: false, message: "Failed to add product" });
    }
    next(err);
});

productRoutes.get("/", (req, res) => {
    // Your existing code for handling the request
});