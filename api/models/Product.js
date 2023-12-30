import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: [String],
    },
    category: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 3,
    },
});

export default mongoose.model("Product", ProductSchema);