import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    revenue: { 
        type: Number, 
        default: 0 }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;