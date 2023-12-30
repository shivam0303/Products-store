import Cart from '../models/Cart.js';
export const createCart = async (req, res, next) => {
    try{
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
        res.status(200).send("Added to cart");
    } catch (error) {
        next(error);
    }
}

export const getCart = async (req, res, next) => {
    try{
        const cart = await Cart.find({username: req.params.username});
        // console.log(req.body.username);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

export const getCartTotal = async (req, res, next) => {
    try{
        const username = req.params.username;
        const cart = await Cart.findOne({ username });

        let total = 0;
        if (cart && cart.products) {
            cart.products.forEach((product) => {
                total += product.quantity * product.price;
            });
        }

        res.status(200).json({ total });
    } catch (error) {
        next(error);
    }
}

export const modifyCart = async (req, res, next) => {
    try{
        const cart = await Cart.findOneAndUpdate({username: req.body.username}, {$set: {products: req.body.products}});
        res.status(200).send("cart updated");
    } catch (error) {
        next(error);
    }
} 

export const deleteCart = async (req, res, next) => {
    try {
        const result = await Cart.deleteOne({ username: req.params.username });
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        next(error);
    }
};