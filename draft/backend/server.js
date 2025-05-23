import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnect.js";
import productRoutes from "./routes/router.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products/", productRoutes);

//sets file to static
app.use(express.static(path.join(__dirname, '../frontend')));

//run html file here
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/Products.html"));
});

//address
app.listen(PORT, () => {
    connectDB();
    console.log("Server started http://localhost:" + PORT);
});