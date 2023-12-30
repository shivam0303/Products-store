import express from 'express';
import Product from '../models/Product.js';
import { createProduct, getSingleProduct, getAllProducts } from '../controllers/product.js';

const router = express.Router();

router.post("/", createProduct);

//get a product
router.get("/:id", getSingleProduct);

//get all products
router.get("/", getAllProducts);



export default router;
