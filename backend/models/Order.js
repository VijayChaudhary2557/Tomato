const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    items: {
        type: Array,
        require: true,
    },
    amount: {
        type: Number,
        require: true 
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: "Food Processing",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    payment: {
        type: Boolean,
        default: false,
    }
});


const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;