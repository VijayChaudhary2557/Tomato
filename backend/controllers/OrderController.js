const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const User = require('../models/User');

module.exports.placeOrder = async (req, res) => {

    const frontend_url = 'http://localhost:5174';
    console.log("enter");
    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        console.log("New Order saved");

        await User.findByIdAndUpdate(req.body.userId, {cartData: {}});
        console.log("Cart updated");

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },  
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity 
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        });

        console.log("Create Session");
        console.log(line_items);

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        console.log("Response created");
        res.json({success: true, session_url: session.url});

    } catch (error) {
        res.json({success: false, message: `Error: ${error.message}`});
    }
}



module.exports.verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;

    try {
        if(success == 'true') {
            await Order.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Paid"});
        }
        else {
            await Order.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not Paid"});
        }
    } catch (error) {
        res.json({success: false, message: `Error: ${error}`});
    }
}


//  User order for frontend

module.exports.userOrders = async (req, res) => {
    try {
        const orders = await Order.find({userId:req.body.userId});
        res.json({success: true, data:orders});
    } catch (error) {
        res.json({success: false, message: `Error: ${error}`});
    }
}


//  Listing orders for admin panel

module.exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json({success: true, data:orders});
    } catch (error) {
        res.json({success: false, message: `Error: ${error}`});
    }
}

//  Api for updating status

module.exports.updateStatus = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: 'Status Updated'});
    } catch (error) {
        res.json({success: false, message: `Error: ${error}`});
    }
}