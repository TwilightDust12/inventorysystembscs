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
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve landing page at root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/Products.html"));
});

// API routes
app.use("/", authRoutes);
app.use("/", contactRoutes);
app.use("/api/products/", productRoutes);

//address
app.listen(PORT, () => {
    connectDB();
    console.log("Server started http://localhost:" + PORT);
});