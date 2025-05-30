import express from "express";
import Sale from "../models/sale-logs.js"

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
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/api/sales', async (req, res) => {
  try {
    await Sale.deleteMany({});
    res.status(200).json({ message: 'All sales deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;