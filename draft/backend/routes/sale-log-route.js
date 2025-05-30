import express from "express";
import Sale from "../models/sale-logs.js"; // Ensure this is your Mongoose model for sales

const router = express.Router();

// POST /api/sales
router.post('/api/sales', async (req, res) => {
    const { productId, amount, revenue } = req.body;
    try {
        const sale = new Sale({ productId, amount, revenue });
        await sale.save();
        res.status(201).json(sale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/sales/weekly
router.get('/api/sales/weekly', async (req, res) => {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6);

    const sales = await Sale.aggregate([
        {
            $match: {
                date: { $gte: weekAgo, $lte: today }
            }
        },
        {
            $group: {
                _id: { $dayOfWeek: "$date" }, // 1=Sunday, 7=Saturday
                totalRevenue: { $sum: "$revenue" },
                totalPurchases: { $sum: "$amount" }
            }
        }
    ]);

    res.json(sales);
});

router.get('/api/sales', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.set("Cache-Control", "no-cache, no-store, must-revalidate"); 
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE route to reset sales
router.delete("/api/sales", async (req, res) => {
  try {
    const result = await Sale.deleteMany({}); // Delete all sales records
    console.log("Deleted sales data:", result); // Debugging log
    res.status(200).send("All sales data deleted.");
  } catch (err) {
    console.error("Error deleting sales data:", err);
    res.status(500).send("Failed to reset sales data.");
  }
});

export default router;