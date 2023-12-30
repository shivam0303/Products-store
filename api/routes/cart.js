import express from 'express';
import { createCart, deleteCart, getCart, getCartTotal, modifyCart } from '../controllers/cart.js';

const router = express.Router();

//add products
router.post("/create_cart",createCart);

//get cart
router.get("/:username",getCart);
router.get("/total/:username",getCartTotal);

//modify cart
router.post("/modify_cart",modifyCart);

//delete cart
router.delete("/:username", deleteCart);


export default router;
 