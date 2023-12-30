import Order from "../models/Order.js";

export const createOrder = async (req, res, next) => {
    try{
        const newOrder = Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).send("Order placed");
    } catch (error) {
        next(error);
    }
}