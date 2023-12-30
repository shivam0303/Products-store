import express from 'express';
import { createOrder } from '../controllers/order.js';

const router = express.Router();

//add products
router.post("/",createOrder);


export default router;
 