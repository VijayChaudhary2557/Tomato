const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { userSchema } = require("../schema");

const validator = require('validator');

const process = require('process');
require('dotenv').config();

const bcrypt = require('bcryptjs');

// ...........................Login User.......................

module.exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.json({ success: false, message: `User doesn't exist!` });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({ success: false, message: `Invalid credentials` });
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });

    } catch (error) {
        return res.json({ success: false, message: `Error: ${error}` });
    }
}


// ...........................Create Token......................


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// ...........................Register User...................

module.exports.registerUser = async (req, res) => {

    let { error } = userSchema.validate(req.body);

    if (error) {
        return res.json({ success: false, message: `Error: ${error}` });
    } else {
        const {name, password, email} = req.body;
        
        try {

            // .......................Checking User Already exists...................

            const exists = await User.findOne({email});

            if(exists) {
                return res.json({success: false, message: "Email already used!"})
            }

            if(!validator.isEmail(email)){
                return res.json({success: false, message: "Invalid Email!"})
            }

            // .............................Hashing password............................

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                name: name,
                email: email,
                password: hashPassword,
            });

            const user = await newUser.save();

            const token = createToken(user._id);

            res.json({success: true, token})

        } catch (error) {
            return res.json({success: false, message: `Error: ${error}`});
        }
    }
    
}