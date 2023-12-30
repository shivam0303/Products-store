import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).send("New User created!");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        // console.log('Request Body:', req.body);
        if(!user) return next(new Error("Username does not exist!"));
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!validPassword) return next(new Error("Password is not correct!"));

        const accessToken = jwt.sign({userId: user._id }, process.env.JWT_SECRET_KEY);
        const {password, ...rest} = user._doc;
        //returning cookie with jwt token
        res.cookie("access_token",accessToken,{
            httpOnly: true,
        }).status(200).json({...rest});
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { username: 1, email: 1, _id: 0 }); 
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}
