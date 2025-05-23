import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnect.js";
import productRoutes from "./routes/router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products/", productRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log("server started http://localhost:" + PORT);
});