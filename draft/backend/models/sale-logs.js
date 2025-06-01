import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    revenue: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const Sales = mongoose.model('Sales', saleSchema);
export default Sales;