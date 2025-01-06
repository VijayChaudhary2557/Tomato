// Add items  to user cart

const User = require("../models/User")

module.exports.addToCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        
        await User.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Added to cart"});
    } catch (error) {
        res.json({success: false, message: `Error: ${error}`});
    }
}

module.exports.removeFromCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        
        await User.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Removed from cart"});
    } catch (error) {
        res.json({success: false, message: `Error: ${error}`});
    }
}

// // Feact user cart data

module.exports.getCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        let cartData = await userData.cartData;

        res.json({success: true, cartData});
    } catch (error) {
        res.json({success: false, message: `Error: ${error}`});
    }
}