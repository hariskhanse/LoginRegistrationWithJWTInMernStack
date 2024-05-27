const User = require('../models/userModel');
const createError = require('../Utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER USER
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            return next(new createError('User already exists', 400));
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            ...req.body,
            password: hashPassword
        });

        const token = jwt.sign({id: newUser._id}, 'secretKey123', {
            expiresIn: '1d'
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            token,
            user:{
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (err) {
        next(err);
    }
}


// LOGIN USER
exports.login = async (req, res, next) => { 
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user)
            return next(new createError('User not found', 404));

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return next(new createError('Incorrect Password', 400));
        const token = jwt.sign({id: user._id}, 'secretKey123', {
          expiresIn: '1d'  
        });

        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        
    }
}