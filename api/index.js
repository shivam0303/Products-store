import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import productRoute from './routes/product.js';
import cartRoute from './routes/cart.js';
import userRoute from './routes/users.js';
import orderRoute from './routes/order.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; 



const connect = async () => {
    try{ 
        await mongoose.connect(process.env.MONGO_URI);
        console.log("initialised connection to db");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', err => {
    console.log("mongodb disconnected");
});
mongoose.connection.on('connected', err => {
    console.log("mongodb connected");
});

//middlewares
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMsg = err.message || "Something went wrong";
    console.log(err);
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMsg,
    });
})


app.listen(port, () => {
    connect();
    console.log(`server running on port ${port}`);
});