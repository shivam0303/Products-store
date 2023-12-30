import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    pid:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const CartSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    products: [ProductSchema], 
});

export default mongoose.model("Cart", CartSchema);
