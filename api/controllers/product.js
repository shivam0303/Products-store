import Product from "../models/Product.js";

export const createProduct = async (req, res,next) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        next(error);
    }
};

export const getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}